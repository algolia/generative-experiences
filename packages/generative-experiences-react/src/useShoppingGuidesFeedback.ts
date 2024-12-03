import { useState } from 'react';

import { UseShoppingGuidesFeedbackProps } from './ShoppingGuidesFeedback';

export function useShoppingGuidesFeedback({
    client: commerceClient,
    objectIDs: userObjectIDs = [],
    voteTarget: userTarget = 'content',
    userToken
}: UseShoppingGuidesFeedbackProps) {
    const [isLoading, setIsLoading] = useState<'idle' | 'loading' | 'stalled'>(
        'idle'
    );
    const [error, setError] = useState<Error | undefined>(undefined);
    const [alreadyCasted, setAlreadyCasted] = useState<boolean | undefined>(false);

    commerceClient.addAlgoliaAgent('generative-experiences-react', '1.0.0');

    async function castFeedback(voteType: 'upvote' | 'downvote', objectIDs: string[] = userObjectIDs, voteTarget: 'content' | 'headline' = userTarget) {

        setIsLoading('loading');

        if (!objectIDs) {
            throw new Error('objectIDs is required when casting a feedback vote');
        }

        if (!userToken) {
            throw new Error('userToken is required when casting a feedback vote');
        }

        try {
            setIsLoading('loading')
            await commerceClient.vote({
                objectIDs,
                voteType,
                voteTarget,
                userToken,
            })
            setIsLoading('idle');
            setAlreadyCasted(true)
        } catch (err) {
            if ((err as Error).name !== 'AbortError') {
                setIsLoading('idle');
                setError(err as Error);
            }
        }
    }

    return {
        castFeedback,
        error,
        alreadyCasted,
        status: isLoading,
    };
}
