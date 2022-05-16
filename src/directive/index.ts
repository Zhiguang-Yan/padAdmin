import type { App } from 'vue'
// 自动引入
const modules = import.meta.globEager('./modules/*.ts')
const directives: any[] = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  directives.push(...modList)
})

export default function setupDirective(app: App) {
  directives.forEach((directive) => {
    app.use(directive)
  })
}
