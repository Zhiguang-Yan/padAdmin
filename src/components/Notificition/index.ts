import Notificition from './src/index.vue'
import type { App } from 'vue'
export default {
  install: (app: App<Element>) => {
    app.component('pac-notificition', Notificition)
  },
}
