const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fileRules = require('./rules/fileRules')
const styleRules= require('./rules/styleRules')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
    print: path.resolve(__dirname, '../src/print.js')
  },
  plugins: [
    // 默认情况下，这个插件将删除 webpack 的 output.path 目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产。
    new CleanWebpackPlugin(),
    // 使用Html插件自动生成html文件,它会把需要的bundle自动加载
    new HtmlWebpackPlugin({
      title: '管理输出'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../../dist/guides')
  },
  // module 模块化编程 中，开发者将程序分解为功能离散的 chunk(discrete chunks of functionality)，并称之为_模块_。
  module: {
    // 通过 loader，webpack 可以支持以各种语言和预处理器语法编写的模块。
    rules: [
      ...styleRules,
      ...fileRules
    ]
  }
};