interface ImportMetaEnv {
  readonly VITE_EXAMPLES_APP_ID: string;
  readonly VITE_EXAMPLES_MAIN_INDEX_NAME: string;
  readonly VITE_EXAMPLES_API_KEY: string;
  readonly VITE_EXAMPLES_GUIDES_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
