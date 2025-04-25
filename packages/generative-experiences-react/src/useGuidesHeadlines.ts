import { GuideHeadline } from '@algolia/generative-experiences-api-client';
import { useEffect, useRef, useState } from 'react';

import { UseHeadlinesProps } from './GuidesHeadlines';
import { version } from './version';

export function useGuidesHeadlines({
  client: commerceClient,
  showImmediate = false,
  ...defaultOptions
}: UseHeadlinesProps) {
  const [headlines, setHeadlines] = useState<GuideHeadline[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'stalled'>('idle');
  const [error, setError] = useState<Error | undefined>(undefined);

  commerceClient.addAlgoliaAgent('generative-experiences-react', version);

  const abortController = useRef(new AbortController());

  async function showHeadlines(options = {}) {
    const {
      object,
      category,
      breadcrumbs,
      nbHeadlines = 4,
      source = 'index',
      searchParams,
      onlyPublished,
    } = {
      ...defaultOptions,
      ...options,
    };

    if (status === 'loading') {
      abortController.current.abort();
    }

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
        .catch((err) => {
          setError(err as Error);
        });

      if (hits && hits.length === nbHeadlines) {
        setStatus('idle');
        setHeadlines(hits);
        return;
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
    status,
    showHeadlines,
  };
}
