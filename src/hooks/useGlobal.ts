import { getCurrentInstance } from 'vue'

function useGlobal() {
  const { globalProperties } = getCurrentInstance()!.appContext.app.config
  return { ...globalProperties }
}

export default useGlobal
