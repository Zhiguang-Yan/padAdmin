import { Drawer, ColorPicker, Button, Space, Radio, Tooltip, theme } from 'antd'
import { FC } from 'react'
import { connect } from 'react-redux'
import styles from './index.module.less'
import { ReactComponent as Style1 } from '@/icons/svg/style1.svg'
import { ReactComponent as Style2 } from '@/icons/svg/style2.svg'
import { ReactComponent as Navigate1 } from '@/icons/svg/navigate1.svg'
import { ReactComponent as Navigate2 } from '@/icons/svg/navigate2.svg'
import { ReactComponent as Navigate3 } from '@/icons/svg/navigate3.svg'
import { setThemeConfig } from '@/redux/modules/app/action'
import { initialState } from '@/redux/modules/app/reducer'

const Setting: FC<{
  open: boolean
  onClose: Function
  themeConfig: any
  setThemeConfig: any
}> = (props) => {
  const { open, onClose, themeConfig, setThemeConfig } = props
  const {
    token: { colorTextBase }
  } = theme.useToken()
  const colorChange = (_, primary) => {
    setThemeConfig({
      ...themeConfig,
      primary
    })
  }
  const handleReset = () => {
    setThemeConfig(initialState.themeConfig)
    onClose()
  }
  return (
    <Drawer
      title="主题配置"
      width={320}
      placement="right"
      onClose={() => onClose()}
      closable={false}
      maskClosable={false}
      open={open}
      style={{
        color: colorTextBase
      }}
    >
      <div className={styles.item}>
        <div>整体风格</div>
        <Radio.Group
          value={themeConfig.theme}
          onChange={(e) =>
            setThemeConfig({
              ...themeConfig,
              theme: e.target.value
            })
          }
        >
          <Radio value="lightMenu">
            <Tooltip title="亮色菜单风格">
              <Style1 className={styles.icon} />
            </Tooltip>
          </Radio>
          <Radio value="darkMenu">
            <Tooltip title="暗色菜单风格">
              <Navigate1 className={styles.icon} />
            </Tooltip>
          </Radio>
          <Radio value="dark">
            <Tooltip title="暗色风格">
              <Style2 className={styles.icon} />
            </Tooltip>
          </Radio>
        </Radio.Group>
      </div>
      <div className={styles.item}>
        <div>主题色</div>
        <ColorPicker
          allowClear
          format="hex"
          value={themeConfig.primary}
          onChange={colorChange}
          presets={[
            {
              label: '预设',
              colors: [
                '#003152',
                '#B05923',
                '#E60000',
                '#900021',
                '#FBD26A',
                '#8F4B28',
                '#01847F',
                '#40E0D0',
                '#002FA7',
                '#81D8CF'
              ]
            }
          ]}
        />
      </div>
      <div className={styles.item}>
        <div>布局</div>
        <Radio.Group
          value={themeConfig.layout}
          onChange={(e) =>
            setThemeConfig({
              ...themeConfig,
              layout: e.target.value
            })
          }
        >
          <Radio value="siderLayout">
            <Tooltip title="侧边菜单布局">
              <Navigate1 className={styles.icon} />
            </Tooltip>
          </Radio>
          <Radio value="headerLayout">
            <Tooltip title="顶部菜单布局">
              <Navigate2 className={styles.icon} />
            </Tooltip>
          </Radio>
          <Radio value="mixLayout">
            <Tooltip title="混合菜单布局">
              <Navigate3 className={styles.icon} />
            </Tooltip>
          </Radio>
        </Radio.Group>
      </div>
      <div className={styles.footer}>
        <Space>
          <Button type="primary" onClick={() => onClose()}>
            保存
          </Button>
          <Button type="default" onClick={handleReset}>
            恢复默认
          </Button>
        </Space>
      </div>
    </Drawer>
  )
}

const mapStateToProps = (state: Store) => ({
  themeConfig: state.app.themeConfig
})

const mapDispatchToProps = {
  setThemeConfig
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
