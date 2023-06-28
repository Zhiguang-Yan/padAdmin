import { Row, Col } from 'antd'
import { ReactComponent as Good } from '@/icons/svg/good.svg'
import { ReactComponent as Target } from '@/icons/svg/target.svg'
import { PayCircleOutlined, BarsOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import BarChart from './component/BarChart'
import LineChart from './component/LineChart'
import Quarter from './component/Quarter'
const Workbench = () => {
  return (
    <Row gutter={20}>
      <Col span={8}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <div className={`card ${styles.font_color}`}>
              <div className={`header ${styles.blue_header}`}>
                <Good className={styles.font_color} />
                <span>商品</span>
              </div>
              <div className={`content ${styles.blue_header}`}>
                <div className={styles.good_box}>
                  <div>
                    <div>已售数量</div>
                    <div className={styles.fw}>4,300</div>
                  </div>
                  <div>
                    <div>待售数量</div>
                    <div className={styles.fw}>4,300</div>
                  </div>
                  <div>
                    <div>好评度</div>
                    <div className={styles.fw}>99%</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={24}>
            <div className="card">
              <div className="header">
                <BarsOutlined />
                <span>订单</span>
              </div>
              <div className="content">
                <div className={styles.good_box}>
                  <div>
                    <div>已完成订单</div>
                    <div className={styles.fw}>6,450</div>
                  </div>
                  <div>
                    <div>计划完成订单</div>
                    <div className={styles.fw}>10,750</div>
                  </div>
                </div>
              </div>
              <Quarter />
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={16}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <div className="card">
              <div className="header">
                <Target />
                <span>小目标</span>
              </div>
              <div className="content">
                <BarChart />
              </div>
            </div>
          </Col>
          <Col span={24}>
            <div className="card">
              <div className="header">
                <PayCircleOutlined />
                <span>销售额</span>
              </div>
              <div className="content">
                <LineChart />
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Workbench
