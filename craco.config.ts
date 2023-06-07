const path = require('path')
const resolve = (dir: string) => path.join(__dirname, dir)
const CracoLessPlugin = require('craco-less')
const { loaderByName } = require('@craco/craco')

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
const lessModuleRegex = /\.module\.less$/
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
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessModuleRule(lessModuleRule) {
          lessModuleRule.test = lessModuleRegex
          const cssLoader = lessModuleRule.use.find(loaderByName('css-loader'))
          cssLoader.options.modules = {
            localIdentName: '[local]_[hash:base64:5]'
          }
          return lessModuleRule
        },
        modifyLessRule(lessRule) {
          lessRule.exclude = lessModuleRegex
          return lessRule
        },
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true
          }
        }
      }
    }
  ],
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
