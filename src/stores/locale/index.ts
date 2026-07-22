import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import enUS from 'antdv-next/locale/en_US'
import zhCN from 'antdv-next/locale/zh_CN'

import { useAppConfig } from '@/hooks/useAppConfig'
import i18n from '@/locales'
import type { AppLocale } from '@/locales/types'

const dayjsLocales: Record<AppLocale, string> = {
  'zh-CN': 'zh-cn',
  'en-US': 'en',
}

function syncLocale(locale: AppLocale) {
  i18n.global.locale.value = locale
  dayjs.locale(dayjsLocales[locale])
}

export const useLocaleStore = defineStore(
  'locale',
  () => {
    const { appLocale } = useAppConfig()
    const locale = ref<AppLocale>(appLocale)

    const antdLocale = computed(() => (locale.value === 'zh-CN' ? zhCN : enUS))

    function setLocale(nextLocale: AppLocale) {
      locale.value = nextLocale
      syncLocale(nextLocale)
    }

    function initLocale() {
      syncLocale(locale.value)
    }

    return {
      locale,
      antdLocale,
      setLocale,
      initLocale,
    }
  },
  {
    persist: true,
  },
)
