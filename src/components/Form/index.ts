import type { App } from 'vue'
import Component from './src/index.vue'

export default {
  install(app: App) {
    app.component('pac-form', Component)
  },
}
