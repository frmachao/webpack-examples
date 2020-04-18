const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const cleanWebpackPlugin = require("clean-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

/**
 * 我们需要将 mode 配置选项设置为 production 
 * webpack 就会启用 minification(代码压缩) 和 tree shaking
 * 从 webpack v4 开始, 指定 mode 会自动地配置 DefinePlugin
 */
module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        //删除dist目录
        new cleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'), //根目录
            verbose: true, //开启在控制台输出信息
            dry: false,
        }),
        //压缩css
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
    ],
    optimization: {
        // 生产模式为true,所以不用操作，可以手动开启和调节minimizer选项
        // minimize: true,
        minimizer: [
            new TerserPlugin({
                // 使用多进程并行运行来提高构建速度
                parallel: true,
                // 使用文件缓存
                cache: true,
                terserOptions: {
                    // 去除console等信息
                    compress: {
                        warnings: false,
                        drop_console: false,
                        drop_debugger: false,
                        // Terser 将假定这些函数不会产生副作用
                        // pure_funcs: ['console.log']
                    },
                    // 兼容性
                    safari10:true,
                },
            }),
        ],
    },
});