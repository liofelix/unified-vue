<script setup lang="ts"></script>

<template>
  <div class="home">
    <header class="home__header">
      <AppLocaleSwitcher />
    </header>
  </div>
</template>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  padding: 24px;

  &__header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24px;
  }
}
</style>
