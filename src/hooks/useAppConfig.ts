import type { AppConfig } from '@/types/config'

const useAppConfig = (): AppConfig => window.APP_CONFIG

export { useAppConfig }
