import './index.scss'
import { Row } from 'antd'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
const Home = () => {
  return (
    <div className="home">
      <Row gutter={[16, 16]}>
        <Section1 />
        <Section2 />
        <Section3 />
      </Row>
    </div>
  )
}

export default Home
