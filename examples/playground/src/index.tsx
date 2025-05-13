/** @jsxRuntime classic */
/** @jsx createElement */

import { createClient } from '@algolia/generative-experiences-api-client';
import {
  GuidesHeadlines,
  GuideContent,
  useGuideContent,
  useGuidesHeadlines,
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

// test generate headlines
// client.generateHeadlines({
//   category: 'category',
//   tone: 'natural',
//   language_code: 'english',
// });

// test generate content for a headline
// commerceClient.generateContent({
//   objectID: '123',
// });

const HitComponent = ({ hit }: { hit: any }) => {
  return <div>{hit.title}</div>;
};

function ComponentTest() {
  const { headlines, status } = useGuidesHeadlines({
    client,
    showImmediate: true,
    category: 'category',
  });

  const { content, status: contentStatus } = useGuideContent({
    client,
    objectID: '1234',
    showImmediate: true,
    onlyPublished: false,
  });

  // const {
  //   headlines: generatedHeadlines,
  //   status: generatedHStatus,
  // } = useGuidesHeadlines({
  //   client: commerceClient,
  //   showImmediate: true,
  //   category: 'category',
  // });
  // const {
  //   content: generatedContent,
  //   status: generatedStatus,
  // } = useGuideContent({
  //   client: commerceClient,
  //   objectID: '123',
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
      <GuidesHeadlines
        showFeedback
        userToken="aabc"
        client={client}
        category="category"
        showImmediate
      />
      <GuidesFeedback client={client} objectIDs={['123']} userToken="abc" />
      <GuideContent
        client={client}
        showFeedback
        userToken="aabc"
        objectID="123"
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
