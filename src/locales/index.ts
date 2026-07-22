import { createI18n } from 'vue-i18n'

import { useAppConfig } from '@/hooks/useAppConfig'

import enUS from './messages/en-US'
import zhCN from './messages/zh-CN'

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

const { appLocale } = useAppConfig()

const i18n = createI18n({
  legacy: false,
  locale: appLocale,
  fallbackLocale: 'en-US',
  messages,
})

export default i18n
