import { App } from 'vue'
const modules = import.meta.globEager('../components/*/*.ts')
const components: any[] = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  components.push(...modList)
})
export default {
  install(app: App) {
    components.map((component) => {
      app.use(component)
    })
  },
}
