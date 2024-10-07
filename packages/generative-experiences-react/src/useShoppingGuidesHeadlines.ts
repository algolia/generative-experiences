import { ShoppingGuideHeadline } from '@algolia/generative-experiences-api-client';
import { useEffect, useRef, useState } from 'react';

import { UseShoppingGuidesHeadlinesProps } from './ShoppingGuidesHeadlines';

export function useShoppingGuidesHeadlines({
  client: commerceClient,
  showImmediate = false,
  ...defaultOptions
}: UseShoppingGuidesHeadlinesProps) {
  const [headlines, setHeadlines] = useState<ShoppingGuideHeadline[]>([]);
  const [isLoading, setIsLoading] = useState<string | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  commerceClient.addAlgoliaAgent('generative-experiences-react', '1.0.0');

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
      ...defaultOptions,
      ...options,
    };

    if (isLoading === 'loading') {
      abortController.current.abort();
    }
    const { signal } = abortController.current;

    if (source === 'index' || source === 'combined') {
      const hits = await commerceClient
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
        setIsLoading('idle');
        setHeadlines(hits);
        return;
      }
    }

    if (source === 'generated' || source === 'combined') {
      setIsLoading('loading');

      if (!category) {
        throw new Error('category is required when using generated headlines');
      }

      try {
        const { data } = await commerceClient.generateHeadlines(
          {
            category,
            nbHeadlines,
            ...generateParams,
          },
          { signal }
        );
        setIsLoading('idle');
        setHeadlines(data);
        abortController.current = new AbortController();
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setIsLoading('idle');
          setError(err as Error);
        }
      }
    }
  }

  useEffect(() => {
    if (showImmediate) {
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
    status: isLoading,
    showHeadlines,
  };
}
