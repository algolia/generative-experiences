interface ImportMetaEnv {
  readonly VITE_EXAMPLES_APP_ID: string;
  readonly VITE_EXAMPLES_INDEX_NAME: string;
  readonly VITE_EXAMPLES_SEARCH_ONLY_API_KEY: string;
  readonly VITE_EXAMPLES_WRITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
