import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/redux'

const namespace = 'app'

export const initialState: Store['app'] = {
  isCollapse: false,
  language: 'en',
  themeConfig: {
    // 默认 primary 主题颜色
    primary: '#1890ff',
    borderRadius: 4,
    layout: 'siderLayout',
    // 深色模式
    theme: 'darkMenu',
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

export const appSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    updateCollapse(state, action: PayloadAction<boolean>) {
      state.isCollapse = action.payload
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload
    },
    setThemeConfig(state, action: PayloadAction<any>) {
      state.themeConfig = action.payload
    }
  }
})

export const { updateCollapse, setLanguage, setThemeConfig } = appSlice.actions

export const selectApp = (state: RootState) => state.app

export default appSlice.reducer
