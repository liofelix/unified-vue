<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    width?: number | string
    height?: number | string
    color?: string
  }>(),
  {
    size: '1em',
    color: 'currentColor',
  },
)

const symbolId = computed(() => `#icon-${props.name}`)
const toCssSize = (value: number | string) => (typeof value === 'number' ? `${value}px` : value)
const iconWidth = computed(() => toCssSize(props.width ?? props.size))
const iconHeight = computed(() => toCssSize(props.height ?? props.size))
</script>

<template>
  <svg class="app-svg-icon" :style="{ width: iconWidth, height: iconHeight, color }">
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
