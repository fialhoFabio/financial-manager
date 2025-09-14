interface ImportMetaEnv {
  readonly WAKU_PUBLIC_SUPABASE_URL: string;
  readonly WAKU_PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}