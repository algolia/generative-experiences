import {
  ShoppingGuideHeadlinesOptions,
  ShoppingGuideHeadline,
} from '@algolia/generative-experiences-api-client';
import { useState, useRef, useEffect } from 'preact/hooks';

export function useShoppingGuidesHeadlines(
  props: ShoppingGuideHeadlinesOptions
) {
  const [headlines, setHeadlines] = useState<ShoppingGuideHeadline[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'stalled'>('idle');
  const [error, setError] = useState<Error | undefined>(undefined);

  props.client.addAlgoliaAgent('generative-experiences-js', '1.0.0');

  const abortController = useRef(new AbortController());

  async function showHeadlines(options = {}) {
    const {
      object,
      category,
      breadcrumbs,
      nbHeadlines = 4,
      source = 'index',
      searchParams,
      generateParams,
      onlyPublished,
    } = {
      ...props,
      ...options,
    };

    if (status === 'loading') {
      abortController.current.abort();
    }
    const { signal } = abortController.current;

    if (source === 'index' || source === 'combined') {
      const hits = await props.client
        .getHeadlines({
          category,
          object,
          breadcrumbs,
          nbHeadlines,
          searchParams,
          onlyPublished,
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.warn(
            '[commerce-ai]: error while fetching headlines from Algolia, falling back to generated headlines'
          );
        });

      if (hits && hits.length === nbHeadlines) {
        setStatus('idle');
        setHeadlines(hits);
        return;
      }
    }

    if (source === 'generated' || source === 'combined') {
      setStatus('loading');

      if (!category) {
        throw new Error('category is required when using generated headlines');
      }

      try {
        const { data } = await props.client.generateHeadlines(
          {
            category,
            nbHeadlines,
            ...generateParams,
          },
          { signal }
        );
        setStatus('idle');
        setHeadlines(data);
        abortController.current = new AbortController();
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setStatus('idle');
          setError(err as Error);
        }
      }
    }
  }

  useEffect(() => {
    if (props.showImmediate) {
      showHeadlines();
    }
    return () => {
      abortController.current.abort();
      abortController.current = new AbortController();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    headlines,
    error,
    status,
    showHeadlines,
  };
}
