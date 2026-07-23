<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <main class="login">
    <h1 class="login__title">{{ t('login.title') }}</h1>
  </main>
</template>

<style scoped lang="scss">
.login {
  display: grid;
  min-height: 100vh;
  place-items: center;

  &__title {
    margin: 0;
  }
}
</style>
