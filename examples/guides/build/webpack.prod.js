const merge = require('webpack-merge');
const common = require('./webpack.common.js');
/**
 * 我们需要将 mode 配置选项设置为 production 
 * webpack 就会启用 minification(代码压缩) 和 tree shaking
 * 从 webpack v4 开始, 指定 mode 会自动地配置 DefinePlugin
 */
module.exports = merge(common, {
    mode: 'production',
});