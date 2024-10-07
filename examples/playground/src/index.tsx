/** @jsxRuntime classic */
/** @jsx createElement */

import { createClient } from '@algolia/generative-experiences-api-client';
import {
  ShoppingGuidesHeadlines,
  useShoppingGuidesHeadlines,
} from '@algolia/generative-experiences-react';
import React, { createElement } from 'react';
// @ts-expect-error
import { createRoot } from 'react-dom/client';

const options = {
  appId: import.meta.env.VITE_EXAMPLES_APP_ID ?? '',
  indexName: import.meta.env.VITE_EXAMPLES_INDEX_NAME ?? '',
  searchOnlyAPIKey: import.meta.env.VITE_EXAMPLES_SEARCH_ONLY_API_KEY ?? '',
  writeAPIKey: import.meta.env.VITE_EXAMPLES_WRITE_API_KEY ?? '',
};

const commerceClient = createClient(options);

// test getHeadlines method
commerceClient
  .getHeadlines({
    category: 'On view in Gallery Prince Willem V',
  })
  // eslint-disable-next-line no-console
  .then((response) => console.log(response));

// test getContent method
// commerceClient
//   .getContent({
//     objectID: '333683a3-8038-42bd-9988-2eb97e46ddfd',
//   })
//   // eslint-disable-next-line no-console
//   .then((response) => console.log(response));

// test generate headlines
// commerceClient.generateHeadlines({
//   category: 'Giovanni Antonio Pellegrini',
//   tone: 'natural',
//   language_code: 'en_US',
// });

// test generate content for a headline
// commerceClient.generateContent({
//   objectID: '2ec1d87e-9776-4103-af77-1c9ff960db68',
// });

function ComponentTest() {
  const { headlines, status } = useShoppingGuidesHeadlines({
    client: commerceClient,
    showImmediate: true,
    category: 'On view in Gallery Prince Willem V',
  });

  // eslint-disable-next-line no-console
  console.log(headlines, status);

  return (
    <ShoppingGuidesHeadlines
      client={commerceClient}
      category="On view in Gallery Prince Willem V"
      showImmediate
    />
  );
}

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <ComponentTest />
  </React.StrictMode>
);
