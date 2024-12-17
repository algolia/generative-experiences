# `@algolia/generative-experiences-react`

[![generative-experiences-react](https://img.shields.io/npm/v/@algolia/generative-experiences-react.svg?label=generative-experiences-react)](https://www.npmjs.com/package/@algolia/generative-experiences-react) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

React components for [Algolia Generative Experiences](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/).

> Algolia Generative Experiences is a beta feature according to [Algolia’s Terms of Service (“Beta Services”](https://www.algolia.com/policies/terms/)).

## ✨ Features

- _React_ library to use Algolia's Generative Experiences
- **UMD and ESM compatible**, you can use it with any module loader
- Built with TypeScript

## Installation

All Generative Experiences packages are available on the [npm](https://www.npmjs.com/) registry.

```bash
yarn add @algolia/generative-experiences-react
# or
npm install @algolia/generative-experiences-react
```

## Usage

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

Generate, retrieve and display headlines for shopping guides using the `useShoppingGuidesHeadlines` hook or `ShoppingGuidesHeadlines` widget.

```jsx
import React from 'react';
import { createClient } from '@algolia/generative-experiences-api-client';
import { ShoppingGuidesHeadlines } from '@algolia/generative-experiences-react';

const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
};

const client = createClient(options);

function App({ userToken, category }) {
  //...

  return (
    <ShoppingGuidesHeadlines
      showFeedback
      userToken={userToken}
      client={client}
      category={category}
      showImmediate
    />
  );
}
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

Generate, retrieve and display the content for shopping guides using the `useShoppingGuidesContent` hook or `ShoppingGuidesContent` widget.

```jsx
import React from 'react';
import { createClient } from '@algolia/generative-experiences-api-client';
import { ShoppingGuidesContent } from '@algolia/generative-experiences-react';

const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
};

const client = createClient(options);

function App({ currentObjectID, userToken }) {
  //...

  return (
    <ShoppingGuidesContent
      client={client}
      objectID={currentObjectID}
      showFeedback
      userToken={userToken}
      itemComponent={({ hit }) => {
        return (
          <pre>
            <code>{JSON.stringify(hit)}</code>
          </pre>
        );
      }}
    />
  );
}
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

### Shopping Guides Feedback

Provide user feedback for shopping guides using the `useShoppingGuidesFeedback` hook or `ShoppingGuidesFeedback` widget.

```jsx
import React from 'react';
import { createClient } from '@algolia/generative-experiences-api-client';
import { ShoppingGuidesFeedback } from '@algolia/generative-experiences-react';

const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
};

const client = createClient(options);

function App({ currentObjectID, userToken, category }) {
  //...

  return (
    <ShoppingGuidesFeedback
      client={client}
      objectIDs={currentObjectID}
      userToken={userToken}
    />
  );
}
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

To replace these placeholders with your website-specific content, use the `getters` parameter for `<ShoppingGuidesHeadlines />` or `<ShoppingGuidesContent />`.

```JSX
import { createClient } from '@algolia/generative-experiences-api-client';
import {
  ShoppingGuidesHeadlines,
} from '@algolia/generative-experiences-react';

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

function App({ userToken, category }) {
  //...

  return (
    <ShoppingGuidesHeadlines
      showFeedback
      userToken={userToken}
      client={client}
      category={category}
      showImmediate
    />
  );
}
```

## Styling

### Using `classNames`

Use the `classNames` property to add classes to the widgets, e.g.:

```JSX
<ShoppingGuideHeadlines
  classNames={{
    wrapper: 'YOUR_WRAPPER_CLASS',
    container: 'YOUR_CONTAINER_CLASS',
    item: 'YOUR_ITEM_CLASS',
  }}
/>
```

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
.ais-ShoppingGuideHeadlinesContent-wrapper {
  @apply flex flex-col items-end rounded p-4 border border-gray-200 shadow gap-2;
}

.ais-ShoppingGuideHeadlinesContent-container {
  @apply grid grid-cols-2 lg:grid-cols-4 gap-4;
}

.ais-ShoppingGuideHeadlinesContent-readMore {
  @apply text-orange-500 font-semibold;
}

.ais-ShoppingGuideHeadlinesContent-item {
  @apply bg-gray-100 rounded p-4 space-y-3 flex flex-col justify-between;
}

.ais-ShoppingGuideHeadlinesContent-itemContent {
  @apply space-y-3;
}

.ais-ShoppingGuideHeadlinesContent-itemTitle {
  @apply text-orange-500 font-semibold;
}

.ais-ShoppingGuideHeadlinesContent-itemImage {
  @apply relative aspect-video overflow-hidden;
}

/* display content */
.ais-ShoppingGuideContent-contentSection {
  @apply prose max-w-prose mx-auto px-4;
}

.ais-ShoppingGuideContent-feedbackContainer {
  @apply flex flex-col;
}

.ais-ShoppingGuideContent .ais-Feedback {
  @apply self-end;
}

.ais-ShoppingGuideContent-relatedItemsSection {
  @apply prose max-w-none;
}

.ais-ShoppingGuideContent-relatedItemsTitle {
  @apply max-w-prose mx-auto px-4;
}

.ais-ShoppingGuideContent-relatedItemsListContainer {
  @apply max-w-none px-4;
}

.ais-ShoppingGuideContent-relatedItemsList {
  @apply p-0 grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-4;
}

/* display feedback */
.ais-Feedback {
  @apply text-gray-500 text-sm flex items-center space-x-4;
}

.ais-Feedback-thanksWrapper {
  @apply flex space-x-2 items-center;
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
  @apply h-5 w-5 stroke-2 flex-shrink-0;
}
```

## ❓ Troubleshooting

Encountering an issue? Before reaching out to support, we recommend checking the [GitHub Discussions](https://github.com/algolia/generative-experiences/discussions). You can also open a [Github issue](https://github.com/algolia/generative-experiences/issues/new?assignees=&labels=&projects=&template=Bug_report.md).

## 📄 License

The project is an open-sourced software, licensed under the [MIT license](LICENSE).
