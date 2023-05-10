import { ReactNode, Key } from 'react'
import { connect } from 'react-redux'
import './index.scss'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import type { AppRouteModule } from '@/routes/type'
import { routes } from '@/routes'
import { WHITE_CODE } from '@/config/config'
import { AppstoreOutlined } from '@ant-design/icons'

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
  const { roles } = props
  const generateMenu = (routes: AppRouteModule[], roles: string[]): IMenu[] => {
    return routes.reduce((acc: IMenu[], route) => {
      const children = route.children
      const title = route.meta?.title || ''
      if (route.code && !route.hidden && roles.includes(route.code)) {
        const subMenu = children?.length ? generateMenu(children, roles) : []
        let menuItem: IMenu = {
          title: title,
          path: route.path,
          icon: <AppstoreOutlined />,
          children: [...subMenu]
        }
        if (route.children?.length === 1 && !route.alwaysShow) {
          menuItem = { ...menuItem, ...menuItem.children![0] }
        }
        acc.push(menuItem)
      }
      return acc
    }, [])
  }

  const showOnlyChildren = (menus: IMenu[]): MenuItem[] => {
    return menus.map((menu) =>
      getItem(
        menu.title,
        menu.path,
        menu.icon,
        menu.children?.length ? showOnlyChildren(menu.children) : undefined
      )
    )
  }
  console.log(showOnlyChildren(generateMenu(routes, roles.concat(WHITE_CODE))))

  return (
    <div className="menu">
      <Menu
        mode="inline"
        items={showOnlyChildren(generateMenu(routes, roles.concat(WHITE_CODE)))}
      />
    </div>
  )
}

const mapStateToProps = (state: Store) => ({
  roles: state.user.roles
})

const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu)
