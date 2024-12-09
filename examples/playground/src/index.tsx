/** @jsxRuntime classic */
/** @jsx createElement */

import { createClient } from '@algolia/generative-experiences-api-client';
import {
  ShoppingGuidesHeadlines,
  ShoppingGuidesContent,
  useShoppingGuidesContent,
  useShoppingGuidesHeadlines,
  ShoppingGuidesFeedback,
} from '@algolia/generative-experiences-react';
import React, { createElement } from 'react';
// @ts-expect-error
import { createRoot } from 'react-dom/client';
import '../index.css';

const options = {
  appId: import.meta.env.VITE_EXAMPLES_APP_ID ?? '',
  indexName: import.meta.env.VITE_EXAMPLES_INDEX_NAME ?? '',
  searchOnlyAPIKey: import.meta.env.VITE_EXAMPLES_SEARCH_ONLY_API_KEY ?? '',
  writeAPIKey: import.meta.env.VITE_EXAMPLES_WRITE_API_KEY ?? '',
};

const commerceClient = createClient(options);

// test getHeadlines method
// commerceClient
//   .getHeadlines({
//     category: 'On view in Gallery Prince Willem V',
//   })
//   // eslint-disable-next-line no-console
//   .then((response) => console.log(response));

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

const HitComponent = ({ hit }: { hit: any }) => {
  return <div>{hit.title}</div>;
};

function ComponentTest() {
  const { headlines, status } = useShoppingGuidesHeadlines({
    client: commerceClient,
    showImmediate: true,
    category: 'On view in Gallery Prince Willem V',
  });

  const { content, status: contentStatus } = useShoppingGuidesContent({
    client: commerceClient,
    objectID: 'e4a55f48-19d9-49b0-aed9-2f1aca7e717a',
    // objectID: '333683a3-8038-42bd-9988-2eb97e46ddfd',
    showImmediate: true,
    onlyPublished: false,
  });

  // const {
  //   headlines: generatedHeadlines,
  //   status: generatedHStatus,
  // } = useShoppingGuidesHeadlines({
  //   client: commerceClient,
  //   showImmediate: true,
  //   category: 'On view in Room 14',
  //   source: 'generated',
  // });
  // const {
  //   content: generatedContent,
  //   status: generatedStatus,
  // } = useShoppingGuidesContent({
  //   client: commerceClient,
  //   objectID: 'f47e71e5-44cd-49c9-97eb-8dc7b0527c1b',
  //   source: 'generated',
  //   onlyPublished: false,
  //   showImmediate: true,
  // });

  // eslint-disable-next-line no-console
  console.log('>>>>>>>>>>> content', content, contentStatus);
  // eslint-disable-next-line no-console
  console.log('>>>>>>>>>>> headlines', headlines, status);
  // console.log('>>>>>>>>>>> generated', generatedHeadlines, generatedHStatus);

  return (
    <>
      <ShoppingGuidesHeadlines
        showFeedback
        userToken="aabc"
        client={commerceClient}
        category="On view in Gallery Prince Willem V"
        showImmediate
      />
      <ShoppingGuidesFeedback
        client={commerceClient}
        objectIDs={['e4a55f48-19d9-49b0-aed9-2f1aca7e717a']}
        userToken="abc"
      />
      <ShoppingGuidesContent
        client={commerceClient}
        showFeedback
        userToken="aabc"
        objectID="5b176f34-2bb6-4fe5-b836-7aee7ea4007d"
        onlyPublished={false}
        itemComponent={({ hit }) => <HitComponent hit={hit} />}
      />
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <ComponentTest />
  </React.StrictMode>
);
