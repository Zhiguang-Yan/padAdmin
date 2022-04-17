import Progress from './src/index.vue'
import { App } from 'vue'

export default {
  install(app: App<HTMLElement>) {
    app.component('pad-progress', Progress)
  },
}
