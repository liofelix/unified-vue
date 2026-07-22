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

/**
 * 管理一个 ECharts 容器及其实例。
 *
 * 每次调用应传入一个独立且固定的容器。组件卸载时自动销毁实例。
 */
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
        // Vue 会递归解包普通 ref 中的对象类型，而 EChartsOption 含复杂联合类型。
        // 运行时对象结构不变，因此仅在传入 ECharts 的边界恢复其公开类型。
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
