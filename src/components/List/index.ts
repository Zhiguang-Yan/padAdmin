import List from './src/index.vue'
import type { App } from 'vue'
export default {
  install: (app: App<Element>) => {
    app.component('pac-list', List)
  },
}
