<script setup lang="ts">
import type { MenuProps } from 'antdv-next'

import { useLocaleStore } from '@/stores/locale'
import type { AppLocale } from '@/locales/types'

const localeStore = useLocaleStore()

const localeLabels: Record<AppLocale, string> = {
  'zh-CN': '简体中文',
  'en-US': 'English',
}

const localeMenuItems: MenuProps['items'] = [
  { key: 'zh-CN', label: localeLabels['zh-CN'] },
  { key: 'en-US', label: localeLabels['en-US'] },
]

function isAppLocale(locale: string): locale is AppLocale {
  return locale === 'zh-CN' || locale === 'en-US'
}

function handleLocaleMenuClick({ key }: { key: string }) {
  if (isAppLocale(key)) {
    localeStore.setLocale(key)
  }
}
</script>

<template>
  <div class="app-locale-switcher">
    <a-dropdown
      :menu="{
        items: localeMenuItems,
        selectable: true,
        selectedKeys: [localeStore.locale],
      }"
      placement="bottomRight"
      @menu-click="handleLocaleMenuClick"
    >
      <a-button type="text" aria-label="切换语言">
        <template #icon>
          <AppSvgIcon name="locale" size="16" />
        </template>
      </a-button>
    </a-dropdown>
  </div>
</template>

<style scoped>
.app-locale-switcher {
  display: inline-flex;
  align-items: center;
}
</style>
