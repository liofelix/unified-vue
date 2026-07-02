import { createI18n } from 'vue-i18n'

import enUS from './messages/en-US'
import zhCN from './messages/zh-CN'
import type { AppLocale } from './types'

export const DEFAULT_LOCALE: AppLocale = 'zh-CN'

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'en-US',
  messages,
})

export default i18n
