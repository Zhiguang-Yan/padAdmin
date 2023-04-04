import axios, { AxiosRequestConfig, Canceler } from 'axios'
import { isFunction } from 'lodash'

let pendingMap = new Map<string, Canceler>()

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&')

export class AxiosCanceler {
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果当前没有相同请求就添加
          pendingMap.set(url, cancel)
        }
      })
  }
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      if (cancel && isFunction(cancel)) cancel()
    })
    pendingMap.clear()
  }
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      if (cancel) cancel(url)
      pendingMap.delete(url)
    }
  }
  reset() {
    pendingMap = new Map<string, Canceler>()
  }
}
