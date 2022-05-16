/**
 * 权限指令的封装
 */
import type { App, DirectiveBinding, Directive } from 'vue'
import { checkPermission } from '@/utils/permission'

function checkAuth(el: Element, binding: any) {
  const { value } = binding
  const hasPermission = checkPermission(value)
  if (hasPermission) return
  el.parentNode && el.parentNode.removeChild(el)
}

// 在绑定元素的父组件挂载之后调用
const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  checkAuth(el, binding)
}

// VNode 更新之后调用
const updated = (el: Element, binding: DirectiveBinding<any>) => {
  checkAuth(el, binding)
}

// 指令
const authDirective: Directive = {
  mounted,
  updated,
}

export default {
  install(app: App<Element>) {
    app.directive('auth', authDirective)
  },
}
