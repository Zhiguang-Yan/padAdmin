// export { default as MChooseIcon } from './src/index.vue'
import type { App } from 'vue'
import MchooseIcon from './src/index.vue'
export default {
  install(app: App<Element>) {
    app.component('pac-choose-icon', MchooseIcon)
  },
}
