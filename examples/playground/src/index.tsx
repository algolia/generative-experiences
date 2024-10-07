/** @jsxRuntime classic */
/** @jsx createElement */

import { createClient } from '@algolia/generative-experiences-api-client';
import { createShoppingGuidesHeadlinesComponent } from '@algolia/generative-experiences-vdom';
import React, { Fragment, createElement } from 'react';
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
    nbHeadlines: 2,
  })
  // eslint-disable-next-line no-console
  .then((response) => console.log(response));

// test getContent method
commerceClient
  .getContent({
    objectID: '333683a3-8038-42bd-9988-2eb97e46ddfd',
  })
  // eslint-disable-next-line no-console
  .then((response) => console.log(response));

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

const headlines = [
  {
    description:
      "Discover the captivating landscapes of Jacob Sibrandi Mancadan, including 'Italian Landscape with Ruins'. Understand his style, influences, and the historical context of his work.",
    objectID: '333683a3-8038-42bd-9988-2eb97e46ddfd',
    title: 'The Artistic Landscape of Jacob Sibrandi Mancadan',
  },
  {
    description:
      'Experience the tranquility and grandeur of landscape art. From Italian ruins to serene countrysides, each painting is a journey.',
    objectID: '64aa230b-22ab-43a6-8bf8-7d81bf7834e7',
    title: 'The Allure of Landscape Art',
  },
];

const UncontrolledHeadlinesButton = createShoppingGuidesHeadlinesComponent({
  // @ts-expect-error
  createElement,
  Fragment,
});

function ComponentTest() {
  return (
    <UncontrolledHeadlinesButton
      //   itemComponent={() => <div>Hi</div>}
      status="idle"
      items={headlines}
      //   {...props}
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
