import type { App } from 'vue'

import Component from './src/index.vue'

export default {
  install(app: App<Element>) {
    app.component('pac-choose-area', Component)
  },
}
