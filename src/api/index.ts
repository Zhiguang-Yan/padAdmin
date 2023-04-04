import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
import { checkStatus } from './helper/checkStatus'
import { AxiosCanceler } from './helper/axiosCancel'
const config: AxiosRequestConfig = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: '',
  // 设置超时时间（10s）
  timeout: 10 * 1000,
  // 跨域时候允许携带凭证
  withCredentials: true
}

const axiosCanceler = new AxiosCanceler()

class RequestHttp {
  private instance: AxiosInstance
  public constructor(options: AxiosRequestConfig) {
    this.instance = axios.create(options)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到redux/本地储存当中
     */
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // * 将当前请求添加到 pending 中
        axiosCanceler.addPending(config)
        return {
          ...config,
          headers: { ...config.headers, 'x-access-token': 'token' }
        } as any
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response
        axiosCanceler.removePending(config)
        return data
      },
      (error: AxiosError) => {
        const { response } = error
        // 请求超时单独判断，请求超时没有 response
        if (error.message.indexOf('timeout') !== -1) message.error('请求超时，请稍后再试')
        // 根据响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status)
        // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) window.location.hash = '/500'
        return Promise.reject(error)
      }
    )
  }
}

const RAxios = new RequestHttp(config)

export default RAxios
