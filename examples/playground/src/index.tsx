/** @jsxRuntime classic */
/** @jsx createElement */

import { createClient } from '@algolia/generative-experiences-api-client';
import {
  GuidesHeadlines,
  GuideContent,
  GuidesFeedback,
} from '@algolia/generative-experiences-react';
import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';

const options = {
  appId: import.meta.env.VITE_EXAMPLES_APP_ID ?? '',
  indexName: import.meta.env.VITE_EXAMPLES_INDEX_NAME ?? '',
  searchOnlyAPIKey: import.meta.env.VITE_EXAMPLES_SEARCH_ONLY_API_KEY ?? '',
  writeAPIKey: import.meta.env.VITE_EXAMPLES_WRITE_API_KEY ?? '',
};

const client = createClient(options);

/* Test methods from api client, replace 'objectID' and 'category' parameters */

// test getHeadlines method
// commerceClient
//   .getHeadlines({
//     category: 'category',
//   })
//   // eslint-disable-next-line no-console
//   .then((response) => console.log(response));

// test getContent method
// commerceClient
//   .getContent({
//     objectID: '123',
//   })
//   // eslint-disable-next-line no-console
//   .then((response) => console.log(response));

/* Add custom itemComponent to reflect your use case */
const ItemComponent = ({ hit }: { hit: any }) => {
  return <div>{hit.name.english}</div>;
};

function PlaygroundApp() {
  /* Test hooks, replace 'objectID' and 'category' parameters */

  // const { headlines, status } = useGuidesHeadlines({
  //   client,
  //   showImmediate: true,
  //   category: 'category',
  // });
  //
  // const { content, status: contentStatus } = useGuideContent({
  //   client,
  //   objectID: 'category',
  //   showImmediate: true,
  //   onlyPublished: false,
  // });

  /* Test React widgets, replace 'objectID', 'category' and 'userToken' parameters */
  return (
    <>
      <GuidesHeadlines
        showFeedback
        userToken="aabc"
        client={client}
        category="cateogry"
        onlyPublished={false}
        showImmediate
      />
      <GuidesFeedback client={client} objectIDs={['123']} userToken="abc" />
      <GuideContent
        client={client}
        showFeedback
        userToken="aabc"
        objectID="123"
        onlyPublished={false}
        itemComponent={({ hit }) => <ItemComponent hit={hit} />}
      />
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <PlaygroundApp />
  </React.StrictMode>
);
