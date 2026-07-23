import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const accessToken = ref<string | null>(null)

    const setAccessToken = (token: string) => {
      accessToken.value = token
    }

    const clearAccessToken = () => {
      accessToken.value = null
    }

    return {
      accessToken,
      setAccessToken,
      clearAccessToken,
    }
  },
  {
    persist: true,
  },
)
