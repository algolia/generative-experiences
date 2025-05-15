/* eslint-disable react/react-in-jsx-scope */

import { createClient } from '@algolia/generative-experiences-api-client';
import {
  guideContent,
  guidesFeedback,
  guidesHeadlines,
} from '@algolia/generative-experiences-js';

type RecordType = {
  title: string;
};

const options = {
  appId: import.meta.env.VITE_EXAMPLES_APP_ID ?? '',
  indexName: import.meta.env.VITE_EXAMPLES_INDEX_NAME ?? '',
  searchOnlyAPIKey: import.meta.env.VITE_EXAMPLES_SEARCH_ONLY_API_KEY ?? '',
  writeAPIKey: import.meta.env.VITE_EXAMPLES_WRITE_API_KEY ?? '',
};

const client = createClient(options);

guidesHeadlines({
  container: '#headlines',
  client,
  userToken: 'test-user',
  showImmediate: true,
  // showFeedback: true,
  category: 'category',
});

guidesFeedback({
  container: '#feedback',
  client,
  objectIDs: ['123'],
  userToken: 'test-user',
});

guideContent<RecordType>({
  container: '#content',
  client,
  onlyPublished: false,
  itemComponent({ hit }) {
    return <div>{hit.title}</div>;
  },
  objectID: '123',
  userToken: 'test-user',
});
