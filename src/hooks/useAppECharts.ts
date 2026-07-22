import { onMounted, onUnmounted, shallowReadonly, shallowRef, toValue, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import * as echarts from 'echarts'
import type { EChartsOption, EChartsType } from 'echarts'
import type { MaybeRefOrGetter, UnwrapRef } from 'vue'

type EChartsContainer = MaybeRefOrGetter<HTMLElement | null | undefined>
type EChartsOptionValue = EChartsOption | UnwrapRef<EChartsOption>
type EChartsOptionSource = MaybeRefOrGetter<EChartsOptionValue | undefined>

export interface UseAppEChartsOptions {
  option?: EChartsOptionSource
  theme?: Parameters<typeof echarts.init>[1]
}

export function useAppECharts(chartContainer: EChartsContainer, options: UseAppEChartsOptions) {
  const { option, theme } = options
  const chartInstance = shallowRef<EChartsType>()
  let isChartMounted = false

  const setChartOption = (option: EChartsOption) => chartInstance.value?.setOption(option)

  const initChart = () => {
    if (!isChartMounted || chartInstance.value) {
      return chartInstance.value
    }

    const container = toValue(chartContainer)
    if (!container?.clientWidth || !container.clientHeight) {
      return undefined
    }

    chartInstance.value = echarts.init(container, theme)

    const chartOption = toValue(option)
    if (chartOption) {
      setChartOption(chartOption as EChartsOption)
    }

    return chartInstance.value
  }

  watch(
    () => toValue(option),
    (chartOption) => {
      if (chartOption) {
        setChartOption(chartOption as EChartsOption)
      }
    },
    { deep: true },
  )

  useResizeObserver(chartContainer, () => initChart()?.resize())

  onMounted(() => {
    isChartMounted = true
    initChart()
  })

  onUnmounted(() => {
    isChartMounted = false
    chartInstance.value?.dispose()
    chartInstance.value = undefined
  })

  return {
    chartInstance: shallowReadonly(chartInstance),
    setChartOption,
  }
}
