import { AxiosRequestConfig } from 'axios'
import VAxios from './axios'

const CONFIG: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000 * 10,
  withCredentials: true
}

const createAxios = (options: AxiosRequestConfig) => {
  return new VAxios(options)
}

export default createAxios(CONFIG)
