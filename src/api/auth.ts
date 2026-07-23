import { requestClient } from '@/utils/request'

interface AuthLoginParams {
  username: string
  password: string
}

export function login(params: AuthLoginParams) {
  return requestClient.post('/system/auth/login', params)
}

export function logout() {
  return requestClient.post('/system/auth/logout')
}
