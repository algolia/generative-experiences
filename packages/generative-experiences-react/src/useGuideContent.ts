import { Guide, GuideType } from '@algolia/generative-experiences-api-client';
import { useEffect, useRef, useState } from 'react';

import { UseGuideContentProps } from './GuideContent';
import { version } from './version';

const defaultState: GuideType = {
  objectID: 'default',
  status: 'draft',
  title: '',
  score_content: 0,
  generated_at: 0,
  type: 'shopping_guide',
  description: '',
  category: '',
  objects: [],
  objectIDs: [],
  content: [
    {
      type: 'introduction',
      content: '',
    },
  ],
  score_headline: 0,
};

export function useGuideContent({
  client: commerceClient,
  showImmediate = true,
  ...defaultOptions
}: UseGuideContentProps) {
  const [content, setContent] = useState<Guide>(defaultState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'stalled'>('idle');
  const [error, setError] = useState<Error | undefined>(undefined);

  commerceClient.addAlgoliaAgent('generative-experiences-react', version);

  const abortController = useRef(new AbortController());

  async function showContent(options = {}) {
    const { objectID, source = 'index', onlyPublished } = {
      ...defaultOptions,
      ...options,
    };

    if (status === 'loading') {
      abortController.current.abort();
    }

    if (source === 'index' || source === 'combined') {
      const retrievedContent = await commerceClient
        .getContent({ objectID, onlyPublished })
        .catch((err) => {
          setError(err as Error);
        });

      if (retrievedContent) {
        setStatus('idle');
        setContent(retrievedContent);
        return;
      }
    }
  }

  useEffect(() => {
    if (showImmediate) {
      showContent();
    }
    return () => {
      abortController.current.abort();
      abortController.current = new AbortController();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    content,
    error,
    status,
    showContent,
  };
}
