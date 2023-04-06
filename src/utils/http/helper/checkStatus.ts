import { message } from 'antd'

interface ErrorMessage {
  [key: number]: string
}

const ERROR_MESSAGES: ErrorMessage = {
  400: '请求失败！请您稍后重试',
  401: '登录失效！请您重新登录',
  403: '当前账号无权限访问！',
  404: '你所访问的资源不存在！',
  405: '请求方式错误！请您稍后重试',
  408: '请求超时！请您稍后重试',
  500: '服务异常！',
  502: '网关错误！',
  503: '服务不可用！',
  504: '网关超时！'
}

const checkStatus = (status: number): void => {
  const errorMsg = ERROR_MESSAGES[status] || '请求失败！'
  message.error(errorMsg)
}

export default checkStatus