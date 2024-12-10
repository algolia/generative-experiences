import { CommerceClient } from '@algolia/generative-experiences-api-client';

export type UseShoppingGuidesFeedbackProps = {
  objectIDs?: string[];
  client: CommerceClient;
  voteTarget?: 'content' | 'headline';
  userToken?: string;
};
