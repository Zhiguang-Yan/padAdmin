import { App } from 'vue'
import ChooseIcon from './ChooseIcon'
import ChooseArea from './ChooseArea'
import Trend from './Trend'
import Notificition from './Notificition'
import List from './List'
import Menu from './Menu'
const components = [ChooseIcon, ChooseArea, Trend, Notificition, List, Menu]

export default {
  install(app: App) {
    components.map((component) => {
      app.use(component)
    })
  },
}
