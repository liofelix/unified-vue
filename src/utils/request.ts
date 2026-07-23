import axios from 'axios'
import { createRequestClient } from '@liofelix/unified-request'

import { useAppConfig } from '@/hooks/useAppConfig'
import router from '@/router'
import pinia from '@/stores'
import { useAuthStore } from '@/stores/auth'

const { appSystemApi } = useAppConfig()

const requestClient = createRequestClient({
  axiosConfig: {
    baseURL: appSystemApi,
  },
  interceptor: {
    request: [
      (config) => {
        const { accessToken } = useAuthStore(pinia)

        if (accessToken) {
          config.headers.set('Authorization', `Bearer ${accessToken}`)
        }

        return config
      },
    ],
    response: [
      (response) => response,
      async (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          useAuthStore(pinia).clearAccessToken()

          if (router.currentRoute.value.name !== 'login') {
            await router.replace({ name: 'login' })
          }
        }

        return Promise.reject(error)
      },
    ],
  },
})

export { requestClient }
