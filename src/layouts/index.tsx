import { FloatButton } from 'antd'
import { useState } from 'react'
import MixLayout from './components/MixLayout'
import HeaderLayout from './components/HeaderLayout'
import SiderLayout from './components/SiderLayout'
import LayoutSetting from './components/Setting'
import { ReactComponent as Setting } from '@/icons/svg/setting.svg'
import { selectApp } from '@/store/festures/appSlice'
import { useStoreSelector } from '@/store'
import './index.less'

const Layouts = () => {
  const appState = useStoreSelector(selectApp)
  const {
    themeConfig: { layout }
  } = appState
  const [show, setShow] = useState(false)
  const layoutMap = {
    siderLayout: <SiderLayout />,
    headerLayout: <HeaderLayout />,
    mixLayout: <MixLayout />
  }
  return (
    <>
      {layoutMap[layout] || <SiderLayout />}
      <FloatButton
        shape="square"
        icon={<Setting className="menu_icon" />}
        tooltip={<div>设置</div>}
        onClick={() => setShow(true)}
      />
      <LayoutSetting open={show} onClose={() => setShow(false)} />
    </>
  )
}

export default Layouts
