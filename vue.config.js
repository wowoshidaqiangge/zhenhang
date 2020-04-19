const path = require('path')
module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
    pluginOptions: {
        'style-resources-loader': {
          preProcessor: 'less',
          patterns: [path.resolve(__dirname, "assets/less/variable.less")] // 引入全局样式变量
        }
  }
}