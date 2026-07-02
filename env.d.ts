/// <reference types="vite-plus/client" />

declare module 'virtual:svg-icons-register'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, unknown>
  export default component
}
