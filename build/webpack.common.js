
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');

const rulesConfig = require('./rules')

module.exports = {
    entry: {},
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name][hash].css',
        }),
        // 生产依赖关系的json文件
        new ManifestPlugin(),
    ],
    // module 模块化编程 中，开发者将程序分解为功能离散的 chunk(discrete chunks of functionality)，并称之为_模块_。
    module: {
        // 通过 loader，webpack 可以支持以各种语言和预处理器语法编写的模块。
        rules: [
            ...rulesConfig
        ]
    },
    resolve: {
        // 自动解析确定的扩展名,能够使用户在引入模块时不带扩展：
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // 设置路径别名
        alias: {
            '@': path.resolve(__dirname, '../site')
        }
    },
    optimization: {
        // 为运行时的代码创建单独的chunk
        runtimeChunk: 'single',
        // SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的 entry chunk 中，或者提取到一个新生成的 chunk。
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
    }
};
// 只为 SPA 页面生成 html 文件
// if (!process.env.MPA) {
//   module.exports.plugins.push(
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, './tpl/spa.html'),
//     }))
// }

