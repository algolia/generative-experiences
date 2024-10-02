/** @jsxRuntime classic */
/** @jsx createElement */

import { createClient } from '@algolia/generative-experiences-api-client';
import React, { Fragment, createElement } from 'react';
// @ts-expect-error
import { createRoot } from 'react-dom/client';
import { createShoppingGuidesHeadlinesComponent } from '@algolia/generative-experiences-vdom';

const options = {
  source: {
    apiKey: '3822adc5fe3553a54bfde83232f4a531',
    appId: '8FVG9T3219',
    indexName: 'artwork',
    categoryAttribute: '',
  },
  content: {
    apiKey: '22adca448c7ba70df7127cf74c0fdf0d',
    appId: '8FVG9T3219',
    indexName: `shopping_guides_artwork`,
  },
};

const commerceClient = createClient(options);

// test getHeadlines method
commerceClient
  .getHeadlines({
    category: 'On view in Gallery Prince Willem V',
    nbHeadlines: 2,
  })
  .then((response) => console.log(response));

// test getContent method
// commerceClient
//   .getContent({
//     category: 'On view in Gallery Prince Willem V',
//     nbHeadlines: 2,
//   })
//   .then((response) => console.log(response));

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

export default ComponentTest();

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <ComponentTest />
  </React.StrictMode>
);
