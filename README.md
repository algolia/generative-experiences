# Algolia Generative Experiences

[![generative-experiences-api-client](https://img.shields.io/npm/v/@algolia/generative-experiences-api-client.svg?label=generative-experiences-api-client)](https://www.npmjs.com/package/@algolia/generative-experiences-api-client) [![generative-experiences-js](https://img.shields.io/npm/v/@algolia/generative-experiences-js.svg?label=generative-experiences-js)](https://www.npmjs.com/package/@algolia/generative-experiences-js) [![generative-experiences-react](https://img.shields.io/npm/v/@algolia/generative-experiences-react.svg?label=generative-experiences-react)](https://www.npmjs.com/package/@algolia/generative-experiences-react) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A repository packaging the API client and UI components for Algolia Generative Experiences. For the full documentation of this feature, please check the [Algolia Docs](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/)

> Algolia Generative Experiences is a beta feature according to [Algolia’s Terms of Service (“Beta Services”](https://www.algolia.com/policies/terms/)).

## ✨ Features

- Thin & **minimal low-level HTTP client** to interact with Algolia's Generative Experiences API
- UI libraries for _JavaScript_ and _React_ templating
- **UMD and ESM compatible**, you can use it with any module loader
- Built with TypeScript

## 💡 Getting Started

The Generative Experiences project exposes 3 packages:

- `@algolia/generative-experiences-api-client`: minimal HTTP client to interact with the API
- `@algolia/generative-experiences-js`: plain JavaScript UI library with accessible components
- `@algolia/generative-experiences-react`: React UI library with accessible components

All of the packages comes with type definition, and are available for both browser and node environments.

### With a package manager (ESModules)

```bash
# for the API Client
npm install @algolia/generative-experiences-api-client@1.0.0
# for the JavaScript UI library
npm install @algolia/generative-experiences-js@1.0.0
# for the React UI library
npm install @algolia/generative-experiences-react@1.0.0
```

### Without a package manager (CommonJS)

```html
// API Client
<script src="https://cdn.jsdelivr.net/npm/@algolia/generative-experiences-api-client@1.0.0/dist/index.umd.js"></script>
<script>
  const { createClient } = window['@algolia/generative-experiences-api-client'];

  const client = createClient({
    appId: 'YourApplicationID',
    indexName: 'YourIndexName',
    searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
    writeAPIKey: 'YourWriteAPIKey', // (optional) only needed for dynamic generation
  });
</script>

// JavaScript UI library
<script src="https://cdn.jsdelivr.net/npm/@algolia/generative-experiences-js@1.0.0/dist/index.umd.js"></script>
<script>
  const generativeExperiences = window['@algolia/generative-experiences-js'];

  generativeExperiences.shoppingGuidesHeadlines({
    client: client,
    container: '#headlines',
    userToken: 'MyUserToken',
    category: 'category',
  });
</script>
```

### Usage

#### Example with [React](/packages/generative-experiences-react)

Displaying a shopping guide:

```JSX
import React from 'react';
import { createClient } from '@algolia/generative-experiences-api-client';
import {
 ShoppingGuidesContent,
} from '@algolia/generative-experiences-react';

const options = {
 appId: 'YourApplicationID',
 indexName: 'YourIndexName',
 searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
};

const client = createClient(options);

function App({ currentObjectID, userToken }) {
 // ...
 return (
   <ShoppingGuidesContent
     client={client}
     showFeedback
     userToken={userToken}
     objectID={currentObjectID}
     onlyPublished
     itemComponent={({ hit }) => {
       return (<code>{JSON.stringify(hit)}</code>);
     }}
   />
 )
}
```

You can find more examples and implementation details in the [Algolia Docs](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/guides/using-shopping-guides/) or in the [React package](/packages/generative-experiences-react/README.md)

#### Example with [JavaScript](/packages/generative-experiences-js)

Displaying a shopping guide:

```JSX
import { createClient } from '@algolia/generative-experiences-api-client';
import {
  shoppingGuidesContent,
} from '@algolia/generative-experiences-js';

const commerceClient = createClient({
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
});

shoppingGuidesContent({
  client: commerceClient,
  objectID: objectID,
  container: '#content',
  userToken: 'MyUserToken',
  showFeedback: true,
  itemComponent({ hit }) {
    return <div>{hit.title}</div>;
  },
});
```

You can find more examples and implementation details in the [Algolia Docs](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/guides/using-shopping-guides/) or in the [JavaScript package](/packages/generative-experiences-js/README.md)

## 🙋 FAQ

- **Can I use Algolia Generative Experiences with another UI framework (Svelte, Vue, Lit, etc...)**

Yes, you can use the API client `@algolia/generative-experiences-api-client` to call the service and build your UI around it. You can learn more in the [Algolia Docs](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/ui-library/alternatives/)

- **Can I use Algolia Generative Experiences with SSR (Server Side Rendering)**

Yes, you can use the API client `@algolia/generative-experiences-api-client` and wrap any custom SSR logic around it. However, the UI libraries don't currently support SSR.

- **Can I sue Algolia Generative Experiences with custom implementation? (Swift, Go, Java, Kotlin, etc..)**

Currently only a JavaScript API client is provided. If want to integrate Algolia Generative Experiences using another language, please open an [issue](https://github.com/algolia/generative-experiences/issues/new) and we will consider adding it.

## ❓ Troubleshooting

Encountering an issue? Before reaching out to support, we recommend checking the [GitHub Discussions](https://github.com/algolia/generative-experiences/discussions). You can also open a [Github issue](https://github.com/algolia/generative-experiences/issues/new?assignees=&labels=&projects=&template=Bug_report.md).

## 📄 License

The project is an open-sourced software, licensed under the [MIT license](LICENSE).
