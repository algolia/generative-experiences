/* eslint-disable no-console */
import { createClient } from '@algolia/generative-experiences-api-client';

const options = {
  appId: process.env.VITE_EXAMPLES_APP_ID ?? '',
  indexName: process.env.VITE_EXAMPLES_INDEX_NAME ?? '',
  searchOnlyAPIKey: process.env.VITE_EXAMPLES_SEARCH_ONLY_API_KEY ?? '',
  writeAPIKey: process.env.VITE_EXAMPLES_WRITE_API_KEY ?? '',
};

const client = createClient(options);

client
  .getHeadlines({
    category: 'Original Starter Pokemon',
    onlyPublished: false,
  })
  .then((headlines) => {
    console.log(
      'Headlines:',
      headlines.map((h) => h.title)
    );
  })
  .catch((error) => {
    console.error('Error fetching headlines:', error);
  });

client
  .getContent({
    objectID: '067e80a2-572a-4cf5-ae8c-e35eac450601',
    onlyPublished: false,
  })
  .then((content) => {
    console.log('Content:', content.title);
  })
  .catch((error) => {
    console.error('Error fetching content:', error);
  });
