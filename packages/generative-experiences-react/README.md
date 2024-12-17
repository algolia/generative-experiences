# `@algolia/generative-experiences-react`

[![generative-experiences-react](https://img.shields.io/npm/v/@algolia/generative-experiences-react.svg?label=generative-experiences-react)](https://www.npmjs.com/package/@algolia/generative-experiences-react) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

React components for [Algolia Generative Experiences](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/).

> Algolia Generative Experiences is a beta feature according to [Algolia’s Terms of Service (“Beta Services”](https://www.algolia.com/policies/terms/)).

## ✨ Features

- UI library for _React_ to use Algolia's Generative Experiences
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

Generate, retrieve and display headlines for shopping guides using the `useShoppingGuidesHeadlines` hook or `ShoppingGuidesHeadlines` widget.

```jsx
import React from 'react';
import { createClient } from '@algolia/generative-experiences-api-client';
import { ShoppingGuidesContent } from '@algolia/generative-experiences-react';

const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
  writeAPIKey: 'YourWriteAPIKey',
};

const gseClient = createClient(options);

function App({ userToken, category }) {
  //...

  return (
    <ShoppingGuidesHeadlines
      showFeedback
      userToken={userToken}
      client={gseClient}
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
| `children` | `ReactNode` | N/A | The children to render. | - |
| `object` | `object \| undefined` | N/A | The object to use for the headlines. | - |
| `nbHeadlines` | `number \| undefined` | 4 | The number of headlines to display. | - |
| `itemComponent` | `ReactNode` | Widget with title, description, image and link to full guide. | Component to display the headlines. | - |
| `onlyPublished` | `boolean` | `true` | Only return headlines that have had their content generated. | - |
| `showImmediate` | `boolean` | `false` | Whether to generate/display the headlines on load. | - |
| `showFeedback` | `boolean` | `false` | Whether to show the feedback buttons. | - |
| `userToken` | `string` | N/A | The user token needed for computing feedback. | `required` if `showFeedback` is `true` |

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
  writeAPIKey: 'YourWriteAPIKey',
};

const gseClient = createClient(options);

function App({ currentObjectID, userToken }) {
  //...

  return (
    <ShoppingGuidesContent
      client={gseClient}
      showFeedback
      userToken={userToken}
      objectID={currentObjectID}
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
| `children` | `ReactNode` | N/A | The children to render. | - |
| `onlyPublished` | `boolean` | `true` | Only display published guides. | - |
| `showImmediate` | `boolean` | `true` | Whether to generate/display the content on load. | - |
| `showFeedback` | `boolean` | `false` | Whether to show the feedback buttons. | - |
| `userToken` | `string` | N/A | The user token needed for computing feedback. | `required` if `showFeedback` is `true` |

### Shopping Guide Feedback

Provide user feedback for shopping guides using the `useShoppingGuidesFeedback` hook or `ShoppingGuidesFeedback` widget.

```jsx
import React from 'react';
import { createClient } from '@algolia/generative-experiences-api-client';
import { ShoppingGuidesFeedback } from '@algolia/generative-experiences-react';

const options = {
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
  writeAPIKey: 'YourWriteAPIKey',
};

const gseClient = createClient(options);

function App({ currentObjectID, userToken, category }) {
  //...

  return (
    <ShoppingGuidesFeedback
      client={commerceClient}
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
| `children` | `ReactNode` | N/A | The children to render. | - |
| `userToken` | `string` | N/A | The user token needed for computing feedback. | `required` |
| `voteTarget` | `'content' \| 'headline'` | `content` | The target of the feedback. | `required` |

## Styling

// TBD
