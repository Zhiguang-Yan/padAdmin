import type { App } from 'vue'
import Menu from './src'
export default {
  install: (app: App<Element>) => {
    app.component('pac-menu', Menu)
  },
}
