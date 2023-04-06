import axios, { AxiosRequestConfig, Canceler } from 'axios'
import { isFunction } from 'lodash'

export default class AxiosCanceler {
  private pendingMap

  constructor() {
    this.pendingMap = new Map<string, Canceler>()
  }

  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = AxiosCanceler.getPendingUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!this.pendingMap.has(url)) {
          // 如果当前没有相同请求就添加
          this.pendingMap.set(url, cancel)
        }
      })
  }

  removeAllPending() {
    this.pendingMap.forEach((cancel) => {
      if (cancel && isFunction(cancel)) cancel()
    })
    this.pendingMap.clear()
  }

  removePending(config: AxiosRequestConfig) {
    const url = AxiosCanceler.getPendingUrl(config)
    if (this.pendingMap.has(url)) {
      const cancel = this.pendingMap.get(url)
      if (cancel) cancel(url)
      this.pendingMap.delete(url)
    }
  }

  reset() {
    this.pendingMap = new Map<string, Canceler>()
  }

  static getPendingUrl(config: AxiosRequestConfig) {
    return [config.method, config.url].join('&')
  }
}
