const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

/**
 * 我们需要将 mode 配置选项设置为 production
 * webpack 就会启用 minification(代码压缩) 和 tree shaking
 * 从 webpack v4 开始, 指定 mode 会自动地配置 DefinePlugin
 */
module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map',
  plugins: [
    // 默认删除 output.path 目录中的所有文件
    new CleanWebpackPlugin(),
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
        // 不提取 license 注释
        extractComments: false,
        terserOptions: {
          output: {
            // 删除 license 注释
            comments: false,
          },
          // 去除console等信息
          compress: {
            warnings: false,
            drop_console: false,
            drop_debugger: false,
            // Terser 将假定这些函数不会产生副作用
            // pure_funcs: ['console.log']
          },
          // 兼容性
          safari10: true,
        },
      }),
    ],
  },
});
