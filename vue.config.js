const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir);
};

module.exports = {
    publicPath: './',
    assetsDir: 'static',
    outputDir: 'dist',
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    // 设为false打包时不生成.map文件
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true //webpack4.0 开启热更新
        // proxy: {
        //     '/api':{
        //         target:'http://jsonplaceholder.typicode.com',
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '/api':''
        //         }
        //     }
        // }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, 'src/assets/less/variable.less')] // 引入全局样式变量
        }
    },
    //设置全局路径
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('api', resolve('src/api'))
            .set('components', resolve('src/components'));
    }
};
