const path = require('path')



module.exports ={
  outputDir: path.resolve(__dirname, "../src/main/resources/static"),
  indexPath: path.resolve(__dirname, "../src/main/resources/templates/index.html"),
  lintOnSave: false,
  devServer: {
    proxy: {

      '/api':{
        target: ' 3.39.78.87:9000/',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }

}
