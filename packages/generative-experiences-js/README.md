# `@algolia/generative-experiences-js`

[![generative-experiences-js](https://img.shields.io/npm/v/@algolia/generative-experiences-js.svg?label=generative-experiences-js)](https://www.npmjs.com/package/@algolia/generative-experiences-js) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

JavaScript UI components for [Algolia Generative Experiences](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/).

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

  generativeExperiences.guidesHeadlines({
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
<div id="headlines"></div>
<div id="content"></div>
<div id="feedback"></div>
```

### Initialize the algolia generative experiences client

```jsx
const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
  region: 'us',
};

const client = createClient(options);
```

Parameters:

- **appId** The Algolia Application ID
- **indexName** The Algolia Index used for generating and displaying shopping guides
- **searchOnlyAPIKey** The Algolia Search API Key needed for reading index data
- **writeAPIKey** The Algolia Write API Key needed for generating guides
- **region** The Region of the Algolia Application. Can be either `us` or `eu`. Default is `us`

### Guides Headlines

Insert your headlines by calling the [`guidesHeadlines`](hhttps://www.algolia.com/doc/guides/algolia-ai/shopping-guides/) function and providing the [`container`](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/). It can be a [CSS selector](https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors) or an [Element](https://developer.mozilla.org/docs/Web/API/HTMLElement).

```jsx
/** @jsx h */
import { h } from 'preact';
import { guidesHeadlines } from '@algolia/generative-experiences-js';
import { createClient } from '@algolia/generative-experiences-api-client';

const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
};

const client = createClient(options);

guidesHeadlines({
  container: '#headlines',
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

### Guide Content

Insert a guide's content by calling the [`guideContent`](hhttps://www.algolia.com/doc/guides/algolia-ai/shopping-guides/) function and providing the [`container`](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/). It can be a [CSS selector](https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors) or an [Element](https://developer.mozilla.org/docs/Web/API/HTMLElement).

```jsx
/** @jsx h */
import { h } from 'preact';
import { shoppingGuideContent } from '@algolia/generative-experiences-js';
import { createClient } from '@algolia/generative-experiences-api-client';

const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
};

const client = createClient(options);

shoppingGuideContent({
  container: '#content',
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
| `featuredItemsTitle` | `string` | Items featured in this article | The title of the realted items carousel found at the end of a guide.            | -                                      |
| `onlyPublished` | `boolean` | `true` | Only display published guides. | - |
| `showImmediate` | `boolean` | `true` | Whether to generate/display the content on load. | - |
| `showFeedback` | `boolean` | `false` | Whether to show the feedback buttons. | - |
| `userToken` | `string` | N/A | The user token needed for computing feedback. | `required` if `showFeedback` is `true` |
| `getters` | `CommersGetters` | - | The custom gathers that help you fetch images and add links. | - |
| `children` | `ReactNode` | - | The children to render. | - |
| `view` | `ViewProps` | - | The view component into which your guide content will be rendered. | - |
| `classNames` | `ContentClassNames` | - | The class names for the component. | - |

### Shopping Guides Feedback

Insert the feedback component by calling the [`GuidesFeedback`](hhttps://www.algolia.com/doc/guides/algolia-ai/shopping-guides/) function and providing the [`container`](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/). It can be a [CSS selector](https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors) or an [Element](https://developer.mozilla.org/docs/Web/API/HTMLElement).

```jsx
/** @jsx h */
import { h } from 'preact';
import { GuidesFeedback } from '@algolia/generative-experiences-js';
import { createClient } from '@algolia/generative-experiences-api-client';

const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
};

const client = createClient(options);

GuidesFeedback({
  container: '#GuidesFeedback',
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

Some of the generated guides may contain placeholders for website-specific content. These are used for the links to the product pages, guide pages as well as images.

To replace these placeholders with your website-specific content, use the `getters` parameter for `guidesHeadlines()` or `guideContent()`.

```JSX
/** @jsx h */
import { h } from 'preact';
import { guidesHeadlines } from '@algolia/generative-experiences-js';
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

guidesHeadlines({
    container: '#headlines',
    client: client,
    userToken: 'MyUserToken',
    showImmediate: true,
    showFeedback: true,
    getters: customGetters,
    category: 'category',
});
```

## Styling

### Using Tailwind CSS

To integrate the widgets with Tailwind, include the `@tailwindcss/typography` plugin in your `tailwind.config.js` and add the following CSS to your project:

```css
.ais-NoWrap {
    @apply whitespace-nowrap;
}

.ais-ScreenReaderOnly {
    @apply sr-only;
}

/* display headlines */
.ais-GuideHeadlinesContent-wrapper {
    @apply rounded p-4 border border-gray-100 shadow gap-2;
}

.ais-GuideHeadlinesContent-container {
    @apply flex flex-col items-end;
}

.ais-GuideHeadlinesContent-itemsContainer {
    @apply flex items-center gap-6;
}

.ais-GuideHeadlinesContent-readMore {
    @apply flex text-white py-2 mt-8 border-2 bg-blue-700 rounded-md items-center w-full justify-center;
}

.ais-GuideHeadlinesContent-item {
    @apply bg-neutral-100 rounded p-4 space-y-3 flex justify-between min-h-[420px];
}

.ais-GuideHeadlinesContent-itemContent {
    @apply mt-5;
}

.ais-GuideHeadlinesContent-itemTitle {
    @apply text-blue-800 font-semibold line-clamp-2 h-12;
}

.ais-GuideHeadlinesContent-itemDescription {
    @apply line-clamp-4 text-base mt-2;
}

.ais-GuideHeadlinesContent-itemImage {
    @apply relative min-h-[120px] max-h-[120px] w-auto overflow-hidden mx-auto mt-4 aspect-square;
}

/* display content */
.ais-GuideContent-contentSection {
    @apply prose max-w-prose mx-auto px-4;
}

.ais-GuideContent {
    @apply mb-10 w-full;
}

.ais-GuideContent-heroImage {
    @apply mx-auto min-h-[200px] max-h-[250px] my-12;
}

.ais-GuideContent .ais-Feedback {
    @apply flex items-end justify-end mx-auto;
}

.ais-GuideContent-factorsList {
    @apply flex flex-wrap list-disc gap-x-2 justify-between w-full;
}

.ais-GuideContent-factorItem {
    @apply w-[45%];
}

.ais-GuideContent-relatedItemsSection {
    @apply prose max-w-none mx-auto px-4;
}

.ais-GuideContent-relatedItemsTitle {
    @apply max-w-prose mx-auto px-4;
}

.ais-GuideContent-relatedItemsListContainer {
    @apply max-w-prose mx-auto px-4;
}

.ais-GuideContent-relatedItemsList {
    @apply p-2 flex justify-between flex-wrap list-none;
}

/* display feedback */
.ais-Feedback {
    @apply text-gray-500 text-base max-w-prose mt-10;
}

.ais-feedbackContainer {
    @apply flex items-center gap-4;
}

.ais-Feedback-thanksWrapper {
    @apply flex items-center;
}

.ais-Feedback-labelWrapper {
    @apply flex space-x-2 items-center;
}

.ais-Feedback-labelIcon {
    @apply h-6 w-6 flex-shrink-0;
}

.ais-Feedback-button {
    @apply inline-block rounded font-semibold text-center shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-white hover:bg-white border-2 border-gray-400 hover:border-gray-500 focus-visible:outline-gray-500 text-gray-400 hover:text-gray-500 px-2.5 py-1.5;
}

.ais-Feedback-buttonsWrapper {
    @apply flex space-x-3 items-center;
}

.ais-Feedback-buttonIcon {
    @apply h-4 w-4 stroke-2 flex-shrink-0;
}

/* error loading guide */
.ais-GuideContentError {
    @apply flex flex-col items-center text-center gap-y-4 max-w-prose mx-auto my-6;
}

.ais-GuideContentErrorTitle {
    @apply text-lg font-semibold;
}
```

## ❓ Troubleshooting

Encountering an issue? Before reaching out to support, we recommend checking the [GitHub Discussions](https://github.com/algolia/generative-experiences/discussions). You can also open a [Github issue](https://github.com/algolia/generative-experiences/issues/new?assignees=&labels=&projects=&template=Bug_report.md).

## 📄 License

The project is an open-sourced software, licensed under the [MIT license](LICENSE).
