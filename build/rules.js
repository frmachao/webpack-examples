const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');
module.exports = [
  {
    test: /\.(css|less)$/,
    include: [path.join(__dirname, '../site')],
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: true,
        }
      },
      "less-loader",
      'postcss-loader',
    ]
  },
  {
    test: /\.(css|less)$/,
    include: [/node_modules/],
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
      },
      "less-loader",
      // 不知道为什么 antd 和 style-loader冲突
      // "style-loader"
    ]
  },
  {
    // 处理图片资源
    // CSS 中的 url('./my-image.png') loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为 output 目录中图像的最终路径
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader'
    ]
  },
  {
    // 处理web字体
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
      'file-loader'
    ]
  },
  // 可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的
  // 也就是说 import Data from './data.json' 默认将正常运行。要导入 CSV、TSV 和 XML 使用 csv-loader 和 xml-loader。
  {
    test: /\.(csv|tsv)$/,
    use: [
      'csv-loader'
    ]
  },
  {
    test: /\.xml$/,
    use: [
      'xml-loader'
    ]
  },
  {

    test: /\.(js|jsx|tsx)$/,
    include: [path.join(__dirname, '../site')],
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ["@babel/preset-typescript", "@babel/preset-env", "@babel/preset-react"],
        plugins: [
          [
            "import",
            {
              libraryName: "antd",
              libraryDirectory: "es",
              style: "css" // `style: true` 会加载 less 文件
            }
          ]
        ]
      }
    }
  }
]
