import {
  ShoppingGuide,
  ShoppingGuideType,
} from '@algolia/generative-experiences-api-client';
import { useEffect, useRef, useState } from 'react';

import { UseShoppingGuidesContentProps } from './ShoppingGuidesContent';

const defaultState: ShoppingGuideType = {
  objectID: '',
  status: 'draft',
  title: '',
  score_content: 0,
  generated_at: 0,
  type: 'shopping_guide',
  description: '',
  category: '',
  objects: [],
  content: [
    {
      title: '',
      content: [],
    },
  ],
  score_headline: 0,
};

export function useShoppingGuidesContent({
  client: commerceClient,
  showImmediate = true,
  ...defaultOptions
}: UseShoppingGuidesContentProps) {
  const [content, setContent] = useState<ShoppingGuide>(defaultState);
  const [isLoading, setIsLoading] = useState<'idle' | 'loading' | 'stalled'>(
    'idle'
  );
  const [error, setError] = useState<Error | undefined>(undefined);

  commerceClient.addAlgoliaAgent('generative-experiences-react', '1.0.0');

  const abortController = useRef(new AbortController());

  async function showContent(options = {}) {
    const { objectID, source = 'index', onlyPublished, generateParams } = {
      ...defaultOptions,
      ...options,
    };

    if (isLoading === 'loading') {
      abortController.current.abort();
    }
    const { signal } = abortController.current;

    if (source === 'index' || source === 'combined') {
      const retrievedContent = await commerceClient
        .getContent({ objectID, onlyPublished })
        .catch((err) => {
          setError(err as Error);
        });

      if (retrievedContent) {
        setIsLoading('idle');
        setContent(retrievedContent);
        return;
      }
    }

    if (source === 'generated' || source === 'combined') {
      setIsLoading('loading');

      if (!objectID) {
        throw new Error('objectID is required when using generated content');
      }

      try {
        const data = await commerceClient.generateContent(
          {
            objectID,
            ...generateParams,
          },
          { signal }
        );
        setIsLoading('idle');
        setContent(data);
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
    status: isLoading,
    showContent,
  };
}
