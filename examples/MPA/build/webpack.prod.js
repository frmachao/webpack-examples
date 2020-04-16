const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const cleanWebpackPlugin = require("clean-webpack-plugin");
/**
 * 我们需要将 mode 配置选项设置为 production 
 * webpack 就会启用 minification(代码压缩) 和 tree shaking
 * 从 webpack v4 开始, 指定 mode 会自动地配置 DefinePlugin
 */
module.exports = merge(common, {
    mode: 'production',
    plugins:[
        //删除dist目录
        new cleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'), //根目录
            verbose: true, //开启在控制台输出信息
            dry: false,
          }),
    ]

});