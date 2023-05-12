const path = require('path')

const svgConfig = {
  test: /\.svg$/,
  include: [path.resolve(__dirname, 'src/assets/svg')],
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

module.exports = {
  webpack: {
    // 配置路径别名
    alias: {
      '@': path.join(__dirname, 'src')
    },
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push(svgConfig)
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
