import { CommerceClient } from '@algolia/generative-experiences-api-client';

export type UseGuidesFeedbackProps = {
  objectIDs?: string[];
  client: CommerceClient;
  voteTarget?: 'content' | 'headline';
  userToken?: string;
};
