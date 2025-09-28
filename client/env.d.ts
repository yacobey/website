/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_API_URL: string;
  readonly VITE_PUBLIC_PHONE_DISPLAY: string;
  readonly VITE_CALENDLY_URL: string;
  readonly VITE_AGENT_PUBLIC_URL: string;
  readonly VITE_SOCIAL_IMAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}