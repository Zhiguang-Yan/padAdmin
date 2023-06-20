import { connect } from 'react-redux'
import { FloatButton } from 'antd'
import { useState } from 'react'
import MixLayout from './components/MixLayout'
import HeaderLayout from './components/HeaderLayout'
import SiderLayout from './components/SiderLayout'
import LayoutSetting from './components/Setting'
import { ReactComponent as Setting } from '@/icons/svg/setting.svg'
import './index.less'

const Layouts = (props) => {
  const { layout } = props
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

const mapStateToProps = (state: Store) => ({
  layout: state.app.themeConfig.layout
})
export default connect(mapStateToProps, null)(Layouts)
