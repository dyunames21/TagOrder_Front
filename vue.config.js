const path = require('path')



module.exports ={
  outputDir: path.resolve(__dirname, "../src/main/resources/static"),
  indexPath: path.resolve(__dirname, "../src/main/resources/templates/index.html"),
  lintOnSave: false,
  devServer: {
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
