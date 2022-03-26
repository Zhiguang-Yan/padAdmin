import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './routes'
import './styles/index.scss'
import { setupStore } from './store'
import './permission'
import { setupUI, setupIcons } from './plugin'
// import { setToken } from '@/utils/auth'
// setToken('555')
;(function initApp() {
  const app = createApp(App)
  setupStore(app)
  setupRouter(app)
  setupUI(app)
  setupIcons(app)
  app.mount('#app')
})()
