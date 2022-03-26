import type { App } from 'vue'

import MChooseArea from './src/index.vue'

export default {
  install(app: App<Element>) {
    app.component('pac-choose-area', MChooseArea)
  },
}
