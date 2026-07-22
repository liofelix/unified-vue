import { reactive, shallowReactive, shallowReadonly, shallowRef } from 'vue'
import type { TablePaginationConfig } from 'antdv-next'

export interface AppTablePageParams {
  current: number
  pageSize: number
}

export interface AppTablePageResult<RecordItem> {
  data: RecordItem[]
  total: number
}

export type AppTableRequest<RecordItem, QueryParams extends object> = (
  queryParams: QueryParams,
  pagination: AppTablePageParams,
) => Promise<AppTablePageResult<RecordItem>>

export function useAppTable<RecordItem, QueryParams extends object>(
  request: AppTableRequest<RecordItem, QueryParams>,
  initialQueryParams: QueryParams,
) {
  const initialQueryParamsSnapshot = { ...initialQueryParams }
  const queryParams = shallowReactive({ ...initialQueryParams })
  const dataSource = shallowRef<RecordItem[]>([])
  const loading = shallowRef(false)
  const pagination = reactive<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
  })

  const handleRequest = async () => {
    const queryParamsSnapshot = Object.assign({}, queryParams)
    const paginationSnapshot: AppTablePageParams = {
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
    }

    loading.value = true

    try {
      const result = await request(queryParamsSnapshot, paginationSnapshot)
      dataSource.value = result.data
      pagination.total = result.total
    } catch {
      return
    } finally {
      loading.value = false
    }
  }

  const handlePageChange = (current: number, pageSize: number): Promise<void> => {
    pagination.current = current
    pagination.pageSize = pageSize
    return handleRequest()
  }

  const handleQuery = (patch?: Partial<QueryParams>): Promise<void> => {
    Object.assign(queryParams, patch)
    pagination.current = 1
    return handleRequest()
  }

  const handleReset = (): Promise<void> => {
    for (const key of Object.keys(queryParams)) {
      delete queryParams[key as keyof QueryParams]
    }

    Object.assign(queryParams, initialQueryParamsSnapshot)
    pagination.current = 1
    return handleRequest()
  }

  const handleRefresh = (): Promise<void> => handleRequest()

  void handleRequest()

  return {
    queryParams,
    dataSource: shallowReadonly(dataSource),
    loading: shallowReadonly(loading),
    pagination,
    handlePageChange,
    handleQuery,
    handleReset,
    handleRefresh,
  }
}
