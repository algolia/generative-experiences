# `@algolia/generative-experiences-js`

[![generative-experiences-js](https://img.shields.io/npm/v/@algolia/generative-experiences-js.svg?label=generative-experiences-js)](https://www.npmjs.com/package/@algolia/generative-experiences-js) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

JavaScript UI components for [Algolia Generative Experiences](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/).

> Algolia Generative Experiences is a beta feature according to [Algolia’s Terms of Service (“Beta Services”](https://www.algolia.com/policies/terms/)).

## ✨ Features

- _JavaScript_ UI library to use Algolia's Generative Experiences
- **UMD and ESM compatible**, you can use it with any module loader
- Built with TypeScript

## Installation

All Generative Experiences packages are available on the [npm](https://www.npmjs.com/) registry.

```bash
yarn add @algolia/generative-experiences-js
# or
npm install @algolia/generative-experiences-js
```

### Without a package manager (CommonJS)

```html
<script src="https://cdn.jsdelivr.net/npm/@algolia/generative-experiences-js/dist/index.umd.js"></script>
<script>
  const generativeExperiences = window['@algolia/generative-experiences-js'];

  generativeExperiences.shoppingGuidesHeadlines({
    client: commerceClient,
    container: '#headlines',
    userToken: 'MyUserToken',
    category: 'category',
  });
</script>
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
};

const client = createClient(options);
```

Parameters:

- **appId** The Algolia Application ID
- **indexName** The Algolia Index used for generating and displaying shopping guides
- **searchOnlyAPIKey** The Algolia Search API Key needed for reading index data
- **writeAPIKey** The Algolia Write API Key needed for generating guides or sending feedback

### Shopping Guides Headlines

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
};

const client = createClient(options);

shoppingGuidesHeadlines({
  container: '#shoppingGuidesHeadlines',
  client: client,
  userToken: 'MyUserToken',
  showImmediate: true,
  showFeedback: true,
  category: 'category',
});
```

| Prop name | Type | Default | Description | Notes |
| --- | --- | --- | --- | --- |
| `client` | - | N/A | The Algolia Generative Experiences client. | `required` |
| `category` | `string` | N/A | The category to use for retrieving/generating the headlines. | `required` |
| `nbHeadlines` | `number \| undefined` | 4 | The number of headlines to display. | - |
| `onlyPublished` | `boolean` | `true` | Only return headlines that have had their content generated. | - |
| `showImmediate` | `boolean` | `false` | Whether to generate/display the headlines on load. | - |
| `showFeedback` | `boolean` | `false` | Whether to show the feedback buttons. | - |
| `userToken` | `string` | N/A | The user token needed for computing feedback. | `required` if `showFeedback` is `true` |
| `getters` | `CommersGetters` | - | The custom gathers that help you fetch images and add links. | - |
| `itemComponent` | `ReactNode` | Widget with title, description, image and link to full guide. | Component to display the headlines. | - |
| `view` | `ViewProps` | - | The view component into which your shopping guide headlines will be rendered. | - |
| `children` | `ReactNode` | - | The children to render. | - |
| `classNames` | `HeadlinesButtonClassNames` | - | The class names for the component. | - |

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
};

const client = createClient(options);

shoppingGuidesContent({
  container: '#shoppingGuidesContent',
  client: client,
  userToken: 'MyUserToken',
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
| `onlyPublished` | `boolean` | `true` | Only display published guides. | - |
| `showImmediate` | `boolean` | `true` | Whether to generate/display the content on load. | - |
| `showFeedback` | `boolean` | `false` | Whether to show the feedback buttons. | - |
| `userToken` | `string` | N/A | The user token needed for computing feedback. | `required` if `showFeedback` is `true` |
| `getters` | `CommersGetters` | - | The custom gathers that help you fetch images and add links. | - |
| `children` | `ReactNode` | - | The children to render. | - |
| `view` | `ViewProps` | - | The view component into which your guide content will be rendered. | - |
| `classNames` | `ContentClassNames` | - | The class names for the component. | - |

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
};

const client = createClient(options);

shoppingGuidesFeedback({
  container: '#shoppingGuidesFeedback',
  client: client,
  userToken: 'MyUserToken',
  objectIDs: ['123'],
  voteTarget: 'content',
});
```

| Prop name | Type | Default | Description | Notes |
| --- | --- | --- | --- | --- |
| `client` | - | N/A | The Algolia Generative Experiences client. | `required` |
| `objectIDs` | `string` | N/A | Array of objectIDs for gathering feedback. | `required` |
| `userToken` | `string` | N/A | The user token needed for computing feedback. | `required` |
| `voteTarget` | `'content' \| 'headline'` | `content` | The target of the feedback. | `required` |
| `children` | `ReactNode` | - | The children to render. | - |
| `view` | `ViewProps` | - | The view component to render your feedback widget. | - |
| `classNames` | `FeedbackClassNames` | - | The class names for the component. | - |

## Customisation with `getters`

Some of the generated shopping guides may contain placeholders for website-specific content. These are used for the links to the product pages, guide pages as well as images.

To replace these placeholders with your website-specific content, use the `getters` parameter for `shoppingGuidesHeadlines()` or `shoppingGuidesContent()`.

```JSX
/** @jsx h */
import { h } from 'preact';
import { shoppingGuidesHeadlines } from '@algolia/generative-experiences-js';
import { createClient } from '@algolia/generative-experiences-api-client';

const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
};

const client = createClient(options);

const customGetters = {
  /**
  * URL for a specific guide.
  */
  guideURL: (objectID) => `/shopping-guide/${objectID}`,
  /**
   * URL for a specific product.
   */
  objectURL: (objectID) => `/product/${objectID}`,
  /**
   * List of images for a product.
   */
  images: (object) =>
    object.images.map((image) => ({ src: image.url, alt: image.alt })),
};

shoppingGuidesHeadlines({
    container: '#shoppingGuidesHeadlines',
    client: client,
    userToken: 'MyUserToken',
    showImmediate: true,
    showFeedback: true,
    getters: customGetters,
    category: 'category',
});
```

## Styling

// TBD

## ❓ Troubleshooting

Encountering an issue? Before reaching out to support, we recommend checking the [GitHub Discussions](https://github.com/algolia/generative-experiences/discussions). You can also open a [Github issue](https://github.com/algolia/generative-experiences/issues/new?assignees=&labels=&projects=&template=Bug_report.md).

## 📄 License

The project is an open-sourced software, licensed under the [MIT license](LICENSE).
