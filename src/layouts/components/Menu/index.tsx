import { ReactNode, Key, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './index.less'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import type { AppRouteModule } from '@/routes/type'
import { routes } from '@/routes'
import { WHITE_CODE } from '@/config/config'
import { useLocation, useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

interface IMenu {
  title: string
  path: string
  icon?: ReactNode
  children?: IMenu[]
}

const getItem = (
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => ({
  key,
  icon,
  children,
  label,
  type
})

const LayoutMenu = (props) => {
  const { roles, themeConfig, uniqueOpened, isCollapse } = props
  const { pathname } = useLocation()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  const navigate = useNavigate()
  // 生成侧边栏菜单
  const generateMenu = (routes: AppRouteModule[], roles: string[]): IMenu[] => {
    return routes.reduce((acc: IMenu[], route) => {
      const children = route.children?.filter((child) => roles.includes(child.code!))
      const title = route.meta?.title || ''
      const icon = route.meta?.icon
      if (route.code && !route.hidden && roles.includes(route.code)) {
        const subMenu = children?.length ? generateMenu(children, roles) : []
        let menuItem: IMenu = {
          title: title,
          path: route.path,
          icon,
          children: [...subMenu]
        }
        if (children?.length === 1 && !route.alwaysShow) {
          menuItem = { ...menuItem, ...menuItem.children![0] }
        }
        acc.push(menuItem)
      }
      return acc
    }, [])
  }
  /**
   * 生成ant侧边栏
   * @param menus
   * @returns
   */
  const generateSide = (menus: IMenu[]): MenuItem[] => {
    return menus.map((menu) =>
      getItem(
        menu.title,
        menu.path,
        menu.icon,
        menu.children?.length ? generateSide(menu.children) : undefined
      )
    )
  }
  const clickMenu: MenuProps['onClick'] = (item) => {
    navigate(item.key)
  }
  // 路径反转为数组
  const reversePath = (path: string) => {
    return path
      .split('/')
      .filter(Boolean)
      .reduce((acc: string[], key) => {
        acc.push(`${acc.length ? acc[acc.length - 1] : acc}/${key}`)
        return acc
      }, [])
  }
  // 设置当前展开的 subMenu
  const onOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    const keysFilter: string[] = latestOpenKey ? reversePath(latestOpenKey) : keys
    setOpenKeys(keysFilter)
  }
  useEffect(() => {
    setSelectedKeys([pathname])
    if (!isCollapse && themeConfig.layout !== 'headerLayout') {
      setOpenKeys(reversePath(pathname))
    }
  }, [isCollapse, pathname, themeConfig])
  return (
    <div className="menu">
      <Menu
        mode="inline"
        triggerSubMenuAction="hover"
        theme={themeConfig.theme.startsWith('dark') ? 'dark' : 'light'}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={uniqueOpened ? onOpenChange : (keys) => setOpenKeys(keys)}
        items={generateSide(generateMenu(routes, roles.concat(WHITE_CODE)))}
        onClick={clickMenu}
        style={{
          borderInlineEnd: 'none'
        }}
        {...props.attrs}
      />
    </div>
  )
}

const mapStateToProps = (state: Store) => ({
  roles: state.user.roles,
  themeConfig: state.app.themeConfig,
  isCollapse: state.app.isCollapse
})

const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu)
