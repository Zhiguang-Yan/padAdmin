const path = require('path')

module.exports = {
  webpack: {
    // 配置路径别名
    alias: {
      '@': path.join(__dirname, 'src')
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
