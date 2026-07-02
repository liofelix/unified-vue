<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()
const { antdLocale } = storeToRefs(localeStore)

localeStore.initLocale()
</script>

<template>
  <a-config-provider :locale="antdLocale">
    <a-app>
      <router-view />
    </a-app>
  </a-config-provider>
</template>

<style scoped></style>
