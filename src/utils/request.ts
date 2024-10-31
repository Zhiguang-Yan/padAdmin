import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store/modules/user'
import { getToken } from './auth'

const userStore = useUserStore()
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL as string,
  timeout: 5000,
})
// 请求头拦截
service.interceptors.request.use(
  // @ts-ignore
  (config: AxiosRequestConfig) => {
    if (userStore.token) {
      // @ts-ignore
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  (error) => {
    console.log('🌰axios请求头拦截>>>>', error)
    return Promise.reject(error)
  }
)
// 响应头拦截
service.interceptors.response.use(
  // @ts-ignore
  (response) => {
    console.log(response)
  },
  (error) => {
    console.log('🌰axios响应头拦截>>>>', error)
    return Promise.reject(error)
  }
)
export default service
