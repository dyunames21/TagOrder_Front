const path = require('path')

module.exports ={
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api':{
        target: 'http://3.39.78.87:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }

}
