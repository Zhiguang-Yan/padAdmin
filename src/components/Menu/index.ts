import type { App } from 'vue'
import Component from './src'
export default {
  install: (app: App<Element>) => {
    app.component('pac-menu', Component)
  },
}
