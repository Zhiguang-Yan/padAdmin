import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
// @ts-ignore
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const { resolve } = require('path')
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_PORT, VITE_APP_PUBLIC_PATH, VITE_POXY_URL } = loadEnv(
    mode,
    process.cwd()
  )
  return {
    base: VITE_APP_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    server: {
      port: Number(VITE_PORT),
      open: true,
      proxy: {
        '/api/': {
          target: VITE_POXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
