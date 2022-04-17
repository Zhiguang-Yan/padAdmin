import ChooseTime from './src/index.vue'
import { App } from 'vue'

export default {
  install(app: App<Element>) {
    app.component('pad-choose-time', ChooseTime)
  },
}
