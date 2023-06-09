import { AppStore } from '../../type'
import produce from 'immer'
import * as types from '@/redux/mutation-types'

export const initialState: AppStore = {
  isCollapse: false,
  language: 'en',
  themeConfig: {
    // 默认 primary 主题颜色
    primary: '#1890ff',
    borderRadius: '4px',
    // 深色模式
    theme: 'dark-menu',
    // 色弱模式(weak) || 灰色模式(gray)
    weakOrGray: 'normal',
    // 面包屑导航
    breadcrumb: true,
    // 标签页
    tabs: true,
    // 页脚
    footer: true
  }
}

const app = (state: AppStore = initialState, { type, payload }) =>
  produce(state, (draftState) => {
    switch (type) {
      case types.UPDATE_COLLAPSE:
        draftState.isCollapse = payload
        break
      case types.SET_LANGUAGE:
        draftState.language = payload
        break
      case types.SET_THEME_CONFIG:
        draftState.themeConfig = payload
        break
      default:
        return draftState
    }
  })

export default app
