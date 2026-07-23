<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()

const handleBackHome = () => {
  void router.replace({ name: 'home' })
}
</script>

<template>
  <main class="not-found">
    <a-result status="404" :title="t('notFound.title')" :sub-title="t('notFound.description')">
      <template #extra>
        <a-button type="primary" @click="handleBackHome">
          {{ t('notFound.backHome') }}
        </a-button>
      </template>
    </a-result>
  </main>
</template>

<style scoped lang="scss">
.not-found {
  display: grid;
  min-height: 100vh;
  box-sizing: border-box;
  place-items: center;
  padding: 24px;
}
</style>
