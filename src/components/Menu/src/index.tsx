import { defineComponent, PropType, useAttrs } from 'vue'
import { useRoute } from 'vue-router'
import * as Icons from '@element-plus/icons'
import { MenuItem } from './type'
export default defineComponent({
  name: 'Menu',
  props: {
    menuList: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
    router: {
      type: Boolean,
      default: true,
    },
  },
  setup: (props, ctx) => {
    const attrs = useAttrs()
    const route = useRoute()
    const renderMenu = (data: MenuItem[]) => {
      return data.map((item: MenuItem) => {
        item.i = (Icons as any)[item.icon!]
        const slots = {
          title: () => {
            return (
              <>
                <item.i />
                <span class="pad-menu-title">{item.title}</span>
              </>
            )
          },
        }
        // 递归生成菜单
        if (item.children && item.children.length > 0) {
          return (
            <el-sub-menu index={item.path} v-slots={slots}>
              {renderMenu(item.children)}
            </el-sub-menu>
          )
        } else {
          // 正常渲染菜单
          return (
            <el-menu-item index={item.path}>
              <item.i />
              <span class="pad-menu-title">{item.title}</span>
            </el-menu-item>
          )
        }
      })
    }
    return () => {
      return (
        <>
          <el-menu default-active={route.path} router={props.router} {...attrs}>
            {renderMenu(props.menuList)}
          </el-menu>
        </>
      )
    }
  },
})
