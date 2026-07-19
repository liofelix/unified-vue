/// <reference types="vite-plus/client" />

interface Window {
  APP_CONFIG: import('./src/types/config').AppConfig
}

declare module 'virtual:svg-icons-register'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, unknown>
  export default component
}
