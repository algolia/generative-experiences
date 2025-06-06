import {
  GuideHeadline,
  GuideHeadlinesOptions,
} from '@algolia/generative-experiences-api-client';
import { useState, useRef, useEffect } from 'preact/hooks';

import { version } from '../version';

export function useGuidesHeadlines(props: GuideHeadlinesOptions) {
  const [headlines, setHeadlines] = useState<GuideHeadline[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'stalled'>('idle');
  const [error, setError] = useState<Error | undefined>(undefined);

  props.client.addAlgoliaAgent('generative-experiences-js', version);

  const abortController = useRef(new AbortController());

  async function showHeadlines(options = {}) {
    const {
      object,
      category,
      breadcrumbs,
      maxHeadlines = 4,
      source = 'index',
      searchParams,
      onlyPublished,
    } = {
      ...props,
      ...options,
    };

    if (status === 'loading') {
      abortController.current.abort();
    }

    if (source === 'index' || source === 'combined') {
      const hits = await props.client
        .getHeadlines({
          category,
          object,
          breadcrumbs,
          maxHeadlines,
          searchParams,
          onlyPublished,
        })
        .catch((err) => {
          setError(err as Error);
        });

      if (hits && hits.length) {
        setStatus('idle');
        setHeadlines(hits);
        return;
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
