
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rulesConfig = require('./rules')

module.exports = {
  entry: {},
  plugins: [
    // 使用Html插件自动生成html文件,它会把需要的bundle自动加载
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, './tpl/index.html'),
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
  output: {},
  // module 模块化编程 中，开发者将程序分解为功能离散的 chunk(discrete chunks of functionality)，并称之为_模块_。
  module: {
    // 通过 loader，webpack 可以支持以各种语言和预处理器语法编写的模块。
    rules: [
      ...rulesConfig
    ]
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