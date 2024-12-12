import { useState } from 'preact/hooks';

import { UseShoppingGuidesFeedbackProps } from '../types';
import { version } from '../version';

export function useShoppingGuidesFeedback({
  client: commerceClient,
  objectIDs: userObjectIDs = [],
  voteTarget: userTarget = 'content',
  userToken,
}: UseShoppingGuidesFeedbackProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'stalled'>('idle');
  const [error, setError] = useState<Error | undefined>(undefined);
  const [alreadyCast, setAlreadyCast] = useState<boolean | undefined>(false);

  commerceClient.addAlgoliaAgent('generative-experiences-js', version);

  async function castFeedback(
    voteType: 'upvote' | 'downvote',
    objectIDs: string[] = userObjectIDs,
    voteTarget: 'content' | 'headline' = userTarget
  ) {
    setStatus('loading');

    if (!objectIDs) {
      throw new Error('objectIDs is required when casting a feedback vote');
    }

    if (!userToken) {
      throw new Error('userToken is required when casting a feedback vote');
    }

    try {
      setStatus('loading');
      await commerceClient.vote({
        objectIDs,
        voteType,
        voteTarget,
        userToken,
      });
      setStatus('idle');
      setAlreadyCast(true);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setStatus('idle');
        setError(err as Error);
      }
    }
  }

  return {
    castFeedback,
    error,
    alreadyCast,
    status,
  };
}
