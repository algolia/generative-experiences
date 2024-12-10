/** @jsxRuntime classic */
/** @jsx h */

import { createClient } from '@algolia/generative-experiences-api-client';
import {
  shoppingGuidesContent,
  shoppingGuidesFeedback,
  shoppingGuidesHeadlines,
} from '@algolia/generative-experiences-js';
import { h } from 'preact';

const options = {
  appId: import.meta.env.VITE_EXAMPLES_APP_ID ?? '',
  indexName: import.meta.env.VITE_EXAMPLES_INDEX_NAME ?? '',
  searchOnlyAPIKey: import.meta.env.VITE_EXAMPLES_SEARCH_ONLY_API_KEY ?? '',
  writeAPIKey: import.meta.env.VITE_EXAMPLES_WRITE_API_KEY ?? '',
};

const commerceClient = createClient(options);

shoppingGuidesHeadlines({
  container: '#headlines',
  client: commerceClient,
  userToken: 'test-user',
  showImmediate: true,
  //   showFeedback: true,
  category: 'On view in Gallery Prince Willem V',
});

shoppingGuidesFeedback({
  container: '#feedback',
  client: commerceClient,
  objectIDs: ['e4a55f48-19d9-49b0-aed9-2f1aca7e717a'],
  userToken: 'test-user',
});

shoppingGuidesContent({
  container: '#content',
  client: commerceClient,
  onlyPublished: false,
  itemComponent({ hit }) {
    // @ts-expect-error
    return <div>{hit.title}</div>;
  },
  objectID: 'e4a55f48-19d9-49b0-aed9-2f1aca7e717a',
  userToken: 'test-user',
});
