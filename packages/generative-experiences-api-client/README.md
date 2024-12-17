# `@algolia/generative-experiences-api-client`

[![generative-experiences-api-client](https://img.shields.io/npm/v/@algolia/generative-experiences-api-client.svg?label=generative-experiences-api-client)](https://www.npmjs.com/package/@algolia/generative-experiences-api-client) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Algolia Generative Experiences is a beta feature according to [Algolia’s Terms of Service (“Beta Services”](https://www.algolia.com/policies/terms/)).

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

  const commerceClient = createClient({
    appId: 'YourApplicationID',
    indexName: 'YourIndexName',
    searchOnlyAPIKey: 'YourSearchOnlyAPIKey',
    writeAPIKey: 'YourWriteAPIKey', // (optional) only needed for dynamic generation
  });
</script>
```

## ❓ Troubleshooting

Encountering an issue? Before reaching out to support, we recommend checking the [GitHub Discussions](https://github.com/algolia/generative-experiences/discussions). You can also open a [Github issue](https://github.com/algolia/generative-experiences/issues/new?assignees=&labels=&projects=&template=Bug_report.md).

## 📄 License

The project is an open-sourced software, licensed under the [MIT license](LICENSE).
