<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    color?: string
  }>(),
  {
    size: '1em',
    color: 'currentColor',
  },
)

const symbolId = computed(() => `#icon-${props.name}`)
const iconSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <svg class="app-svg-icon" :style="{ width: iconSize, height: iconSize, color }">
    <use :href="symbolId" />
  </svg>
</template>

<style scoped>
.app-svg-icon {
  display: inline-block;
  flex-shrink: 0;
  fill: currentcolor;
  vertical-align: -0.125em;
}
</style>
