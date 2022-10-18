const path = require('path')

module.exports ={
  publicPath: "/endProject",
  outputDir : 'docs',
  lintOnSave: false,
  devServer: {
    port: 8000,
    proxy: {
      '/api':{
        target: 'http://localhost:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }

}
