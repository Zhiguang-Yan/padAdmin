import type { App } from 'vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons'
import { toLine } from '../utils'
import PACUI from '../components'

export function setupUI(app: App<Element>) {
  app.use(ElementPlus).use(PACUI)
}
export function setupIcons(app: App<Element>) {
  Object.keys(Icons).forEach((key) => {
    app.component(`el-icon-${toLine(key)}`, (Icons as any)[key])
  })
}
