const path = require('path')
const resolve = (dir: string) => path.join(__dirname, dir)

const customRules = [
  {
    test: /\.svg$/,
    include: resolve('src/assets/svg'),
    type: 'javascript/auto',
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            {
              name: 'removeAttrs',
              params: {
                attrs: 'fill'
              }
            }
          ]
        }
      }
    ]
  }
]
module.exports = {
  webpack: {
    // 配置路径别名
    alias: {
      '@': resolve('src')
    },
    chainWebpack: {},
    configure: (webpackConfig) => {
      webpackConfig.module.rules = [...webpackConfig.module.rules]
      return webpackConfig
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: process.env.REACT_APP_POXY_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

export {}
