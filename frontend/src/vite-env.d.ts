/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly FLIPPO_API_BASE_URL: string;
  readonly FLIPPO_APP_BASE_URL: string;

  readonly FLIPPO_GOOGLE_CLIENT_ID: string;
  readonly FLIPPO_SURREALDB_AC: string;
  readonly FLIPPO_SURREALDB_DB: string;

  readonly FLIPPO_SURREALDB_ENDPOINT: string;
  readonly FLIPPO_SURREALDB_NS: string;
  readonly FLIPPO_VK_CLIENT_ID: string;
  readonly FLIPPO_YANDEX_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
