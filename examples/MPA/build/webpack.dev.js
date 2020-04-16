const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const cleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = merge(common, {
    // 通过选择 development, production 或 none 之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化
    // 其默认值为 production。
    mode: 'development',
    //  启用source map 功能 不要在生产环境开启
    devtool: 'source-map',
    /**
     * webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中
     * 这并不是我预期的 因为我需要产出的 bundle 供 express 使用
     */
    plugins: [
        // 配置全局变量
        new webpack.DefinePlugin({
            // Definitions...
        }),
    ]
});