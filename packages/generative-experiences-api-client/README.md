# `@algolia/generative-experiences-api-client`

[![generative-experiences-api-client](https://img.shields.io/npm/v/@algolia/generative-experiences-api-client.svg?label=generative-experiences-api-client)](https://www.npmjs.com/package/@algolia/generative-experiences-api-client) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

- Thin & **minimal low-level HTTP client** to interact with Algolia's Generative Experiences API
- Works both on the **browser** and **node.js**
- **UMD and ESM compatible**, you can use it with any module loader
- Built with TypeScript

## 💡 Getting Started

All of the packages comes with type definition, and are available for both browser and node environments.

## Installation

All Generative Experiences packages are available on the [npm](https://www.npmjs.com/) registry.

```bash
yarn add @algolia/generative-experiences-api-client
# or
npm install @algolia/generative-experiences-api-client
```

### Without a package manager (CommonJS)

```html
<script src="https://cdn.jsdelivr.net/npm/@algolia/generative-experiences-api-client/dist/index.umd.js"></script>
<script>
  const { createClient } = window['@algolia/generative-experiences-api-client'];

  const client = createClient({
    appId: 'YourApplicationID',
    indexName: 'YourIndexName',
    searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
    writeAPIKey: 'YourWriteAPIKey', // (optional) only needed for dynamic generation
    region: 'us', // (optional) region of the Algolia Application. Can be either `us` or `eu`. Default is `us`
  });
</script>
```

## Usage

### Guides Headlines

Retrieve your guides headlines using the [`getHeadlines()`](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/ui-library/alternatives/#shopping-guide-headlines) method.

```javascript
import { createClient } from '@algolia/generative-experiences-api-client';

const client = createClient({
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
});

client
  .getHeadlines({
    category: guidesCategory,
  })
  .then((response) => console.log(response));
```

You can dynamically generate headlines using the `getOrGenerateHeadlines()` method by passing a source parameter. For this method you must provide a **write API key**, generated with the `search` and `addObject` [ACLs](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl), when initializing the client.

:bangbang: Only use this method in your backend implementation (for example, Node) or if providing a layer of authentication. :bangbang:

```javascript
import { createClient } from '@algolia/generative-experiences-api-client';

const client = createClient({
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
  writeAPIKey: 'YourWriteAPIKey',
});

client
  .getOrGenerateHeadlines({
    category: guidesCategory,
    source: 'generated',
  })
  .then((response) => console.log(response));
```

| Prop name        | Type                                        | Default | Description                                                                               | Notes |
|------------------|---------------------------------------------| --- |-------------------------------------------------------------------------------------------| --- |
| `category`       | `string`                                    | N/A | The category to use for retrieving/generating the headlines.                              | `required` |
| `nbHeadlines`    | `number \| undefined`                       | 4 | The number of headlines to display.                                                       | - |
| `source`         | `'combined' \| 'generated' \| 'index'`      | `index` | The source of the headlines.                                                              | - |
| `tone`           | `'natural' \| 'friendly' \| 'professional'` | `natural` | The model will use a specific tone when provided.                                         | - |
| `language_code`  | `'english' \| 'german' \| 'french'`         | `english` | The language code used for generating headlines.                                          | - |
| `custom_content` | `string`                                    | - | The extended instrcutions that the model should take into account for generating content. | - |
| `keywords`       | `string[]`                                  | - | A list of keywords that the model should highlight in the generated content.              | - |
| `onlyPublished`  | `boolean`                                   | `true` | Only display published guides.                                                            | - |

### Guides Content

Retrieve your guide's content using the [`getContent()`](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/ui-library/alternatives/#shopping-guide-content) method.

```javascript
import { createClient } from '@algolia/generative-experiences-api-client';

const client = createClient({
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
});

client
  .getContent({
    objectID: guideID,
  })
  .then((response) => console.log(response));
```

You can dynamically generate content using the `getOrGenerateContent()` method by passing a source parameter. For this method you must provide a **write API key**, generated with the `search` and `addObject` [ACLs](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl), when initializing the client.

:bangbang: Only use this method in your backend implementation (for example, Node) or if providing a layer of authentication. :bangbang:

```javascript
import { createClient } from '@algolia/generative-experiences-api-client';

const client = createClient({
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
  writeAPIKey: 'YourWriteAPIKey',
});

client
  .getOrGenerateContent({
    objectID: guideID,
    source: 'generated',
  })
  .then((response) => console.log(response));
```

| Prop name | Type | Default | Description | Notes |
| --- | --- | --- | --- | --- |
| `objectID` | `string` | N/A | The objectID for the guide to be retrieved/generated. | `required` |
| `source` | `'combined' \| 'generated' \| 'index'` | `index` | The source of the content. | - |
| `type` | `'shopping_guide' \| 'category_guide'` | `shopping_guide` | The type of guide to generate. | Used if `source` is `generated` |
| `tone` | `'natural' \| 'friendly' \| 'professional'` | `natural` | The model will use a specific tone when provided. | - |
| `language_code` | `'english' \| 'german' \| 'french'` | `english` | The language code used for generating content. | - |
| `custom_content` | `string`                                    | - | The extended instrcutions that the model should take into account for generating content. | - |
| `keywords`       | `string[]`                                  | - | A list of keywords that the model should highlight in the generated content.              | - |
| `onlyPublished` | `boolean` | `true` | Only display published guides. | - |

### Gather Feedback

You can gather user feedback using the [`vote()`](https://www.algolia.com/doc/guides/algolia-ai/shopping-guides/ui-library/alternatives/#gather-feedback) method.

```javascript
import { createClient } from '@algolia/generative-experiences-api-client';

const client = createClient({
  appId: 'YourApplicationID',
  indexName: 'YourIndexName',
  searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
});

client.vote({
  objectID: guideID,
  voteType: 'upvote',
  voteTarget: 'content',
  userToken: userToken,
});
```

| Prop name | Type | Default | Description | Notes |
| --- | --- | --- | --- | --- |
| `client` | - | N/A | The Algolia Generative Experiences client. | `required` |
| `objectIDs` | `string` | N/A | Array of objectIDs for gathering feedback. | `required` |
| `userToken` | `string` | N/A | The user token needed for computing feedback. | `required` |
| `voteTarget` | `'content' \| 'headline'` | `content` | The target of the feedback. | `required` |

## ❓ Troubleshooting

Encountering an issue? Before reaching out to support, we recommend checking the [GitHub Discussions](https://github.com/algolia/generative-experiences/discussions). You can also open a [Github issue](https://github.com/algolia/generative-experiences/issues/new?assignees=&labels=&projects=&template=Bug_report.md).

## 📄 License

The project is an open-sourced software, licensed under the [MIT license](LICENSE).
