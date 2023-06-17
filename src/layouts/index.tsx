import { connect } from 'react-redux'

import MixLayout from './components/MixLayout'
import HeaderLayout from './components/HeaderLayout'
import SiderLayout from './components/SiderLayout'

const Layouts = (props) => {
  const { layout } = props
  switch (layout) {
    case 'siderLayout':
      return <SiderLayout />
    case 'headerLayout':
      return <HeaderLayout />
    case 'mixLayout':
      return <MixLayout />
    default:
      return <SiderLayout />
  }
}

const mapStateToProps = (state: Store) => ({
  layout: state.app.themeConfig.layout
})
export default connect(mapStateToProps, null)(Layouts)
