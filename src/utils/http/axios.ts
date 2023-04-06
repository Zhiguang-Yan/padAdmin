import axios, { Axios, AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message as Message } from 'antd'
import { checkStatus, AxiosCanceler } from './helper'

class VAxios extends Axios {
  private instance: AxiosInstance

  constructor(options: AxiosRequestConfig) {
    super(options)
    this.instance = axios.create(options)
    this.setupInterceptors()
  }

  private setupInterceptors() {
    const axiosCanceler = new AxiosCanceler()
    // 请求配置处理
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        axiosCanceler.addPending(config)
        return config as any
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
    // 响应结果处理
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { config, data } = response
        axiosCanceler.removePending(config)
        return data
      },
      (error: AxiosError) => {
        const { response, message } = error
        // 请求超时单独判断，请求超时没有 response
        if (message.indexOf('timeout') !== -1) Message.error('请求超时，请稍后再试')
        // 根据响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status)
        // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) window.location.hash = '/500'
        return Promise.reject(error)
      }
    )
  }
}

export default VAxios
