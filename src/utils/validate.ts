import type { FormInstance } from 'element-plus'

// 是否为外链
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 验证合法url
 * @param url
 * @returns
 */
export function validURL(url: string) {
  const reg =
    /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
  return reg.test(url)
}

/**
 * 验证邮箱
 * @param email
 * @returns
 */
export function validEmail(email: string) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(email)
}

/**
 * 验证手机（宽松）
 * @param phone
 * @returns
 */
export function validPhone(phone: string) {
  const reg = /^(?:(?:\+|00)86)?1\d{10}$/
  return reg.test(phone)
}

/**
 * 验证element表单
 * @param formEl
 * @returns
 */
export function validELForm(formEl: FormInstance | undefined) {
  return new Promise((resolve, reject) => {
    if (!formEl) {
      reject(new Error('表单ref不存在'))
      return
    }
    formEl.validate((valid, fields) => {
      if (valid) {
        resolve(true)
      } else {
        reject(fields)
      }
    })
  })
}

/** 获取url参数
 * @param {String} url
 */
export function getParams(url: string) {
  const params = {}
  try {
    url
      .split('?')[1]
      .split('&')
      .forEach((str) => {
        params[str.slice(0, str.indexOf('='))] = str.slice(str.indexOf('=') + 1)
      })
  } catch (error) {
    return params
  }
  return params
}
