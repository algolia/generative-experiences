# `@algolia/generative-experiences-js`

JS package for [Algolia Generative Experiences](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/).

## Installation

All Generative Experiences packages are available on the [npm](https://www.npmjs.com/) registry.

```bash
yarn add @algolia/generative-experiences-js
# or
npm install @algolia/generative-experiences-js
```

## Usage

To get started, you need a container for your headlines or content to go in. If you don't have containers already, you can insert them into your markup:

```html
<div id="shoppingGuidesHeadlines"></div>
<div id="shoppingGuidesContent"></div>
<div id="shoppingGuidesFeedback"></div>
```

### Initialize the algolia generative experiences client

```jsx
const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
  writeAPIKey: 'YourWriteAPIKey',
};

const gseClient = createClient(options);
```

Parameters:

- **appId** The Algolia Application ID
- **indexName** The Algolia Index used for generating and displaying shopping guides
- **searchOnlyAPIKey** The Algolia Search API Key needed for reading index data
- **writeAPIKey** The Algolia Write API Key needed for generating guides or sending feedback

### Headlines

Insert your headlines by calling the [`shoppingGuidesHeadlines`](hhttps://www.algolia.com/doc/guides/algolia-ai/shopping-guides/) function and providing the [`container`](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/). It can be a [CSS selector](https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors) or an [Element](https://developer.mozilla.org/docs/Web/API/HTMLElement).

```jsx
/** @jsx h */
import { h } from 'preact';
import { shoppingGuidesHeadlines } from '@algolia/generative-experiences-js';
import { createClient } from '@algolia/generative-experiences-api-client';

const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
  writeAPIKey: 'YourWriteAPIKey',
};

const gseClient = createClient(options);

shoppingGuidesHeadlines({
  container: '#shoppingGuidesHeadlines',
  client: gseClient,
  userToken: 'user-token',
  showImmediate: true,
  showFeedback: true,
  category: 'some-category',
});
```

| Prop name | Type | Default | Description | Notes |
| --- | --- | --- | --- | --- |
| `client` | - | N/A | The Algolia Generative Experiences client. | `required` |
| `category` | `string` | N/A | The category to use for retrieving/generating the headlines. | `required` |
| `children` | `ReactNode` | N/A | The children to render. | - |
| `object` | `object \| undefined` | N/A | The object to use for the headlines. | - |
| `nbHeadlines` | `number \| undefined` | 4 | The number of headlines to display. | - |
| `itemComponent` | `ReactNode` | Widget with title, description, image and link to full guide. | Component to display the headlines. | - |
| `onlyPublished` | `boolean` | `true` | Only return headlines that have had their content generated. | - |
| `showImmediate` | `boolean` | `false` | Whether to generate/display the headlines on load. | - |
| `showFeedback` | `boolean` | `false` | Whether to show the feedback buttons. | - |
| `userToken` | `string` | N/A | The user token needed for computing feedback. | `required` if `showFeedback` is `true` |

### Shopping Guide Content

Insert a guide's content by calling the [`shoppingGuidesContent`](hhttps://www.algolia.com/doc/guides/algolia-ai/shopping-guides/) function and providing the [`container`](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/). It can be a [CSS selector](https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors) or an [Element](https://developer.mozilla.org/docs/Web/API/HTMLElement).

```jsx
/** @jsx h */
import { h } from 'preact';
import { shoppingGuidesContent } from '@algolia/generative-experiences-js';
import { createClient } from '@algolia/generative-experiences-api-client';

const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
  writeAPIKey: 'YourWriteAPIKey',
};

const gseClient = createClient(options);

shoppingGuidesContent({
  container: '#shoppingGuidesContent',
  client: gseClient,
  userToken: 'user-token',
  showFeedback: true,
  objectID: '123',
  itemComponent({ hit }) {
    return <div>{hit.name}</div>;
  },
});
```

| Prop name | Type | Default | Description | Notes |
| --- | --- | --- | --- | --- |
| `client` | - | N/A | The Algolia Generative Experiences client. | `required` |
| `objectID` | `string` | N/A | The objectID for the guide to be retrieved/generated. | `required` |
| `itemComponent` | `ReactNode` | N/A | Component to display items (from an algolia index) listed throughout the guide. | `required` |
| `children` | `ReactNode` | N/A | The children to render. | - |
| `onlyPublished` | `boolean` | `true` | Only display published guides. | - |
| `showImmediate` | `boolean` | `true` | Whether to generate/display the content on load. | - |
| `showFeedback` | `boolean` | `false` | Whether to show the feedback buttons. | - |
| `userToken` | `string` | N/A | The user token needed for computing feedback. | `required` if `showFeedback` is `true` |

### Shopping Guide Feedback

Insert the feedback component by calling the [`shoppingGuidesFeedback`](hhttps://www.algolia.com/doc/guides/algolia-ai/shopping-guides/) function and providing the [`container`](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/). It can be a [CSS selector](https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors) or an [Element](https://developer.mozilla.org/docs/Web/API/HTMLElement).

```jsx
/** @jsx h */
import { h } from 'preact';
import { shoppingGuidesFeedback } from '@algolia/generative-experiences-js';
import { createClient } from '@algolia/generative-experiences-api-client';

const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
  writeAPIKey: 'YourWriteAPIKey',
};

const gseClient = createClient(options);

shoppingGuidesFeedback({
  container: '#shoppingGuidesFeedback',
  client: gseClient,
  userToken: 'user-token',
  objectIDs: ['123'],
  voteTarget: 'content',
});
```

| Prop name | Type | Default | Description | Notes |
| --- | --- | --- | --- | --- |
| `client` | - | N/A | The Algolia Generative Experiences client. | `required` |
| `objectIDs` | `string` | N/A | Array of objectIDs for gathering feedback. | `required` |
| `children` | `ReactNode` | N/A | The children to render. | - |
| `userToken` | `string` | N/A | The user token needed for computing feedback. | `required` |
| `voteTarget` | `'content' \| 'headline'` | `content` | The target of the feedback. | `required` |

## Styling

// TBD
