
module.exports = {
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        "targets": {
          // 默认是 与 process.versions.node 相同,这里让它编译到支持 node 10 版本
          "node": 10
        }
      }
    ]
  ],
  plugins: [
    [
      "module-resolver",
      {
        "root": ["."],
        "alias": {
          "@": "./src"
        }
      }
    ]
  ],
  exclude: [/node_modules/],
}
