const path = require('path')

module.exports ={
  lintOnSave: false,
  devServer: {
    port: 8000,
    proxy: {
      '/api':{
        target: 'http://localhost:9000',
        changeOrigin:true,
        pathRewrite:{
          '^/': ''
        }
      }
    }
  }

}
