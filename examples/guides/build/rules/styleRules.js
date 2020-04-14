module.exports = [
    {
        // webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这个示例中，所有以 .css 结尾的文件，都将被提供给 style-loader 和 css-loader
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    }
]