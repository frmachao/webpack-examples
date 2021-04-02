# 一个支持多页面构建以及单页面构建的 webpack 配置

> Inspired by `zwh1666258377`

## 服务端集成`express` `mongodb` `graphql` 快速开始开发 支持 TypeScript 编写

```bash
|--
    |--build
    |--dist 前端打包后的资源没有`html`文件，`html`交给服务端处理
        |--mpa
            |--page1
            |--page2
        |--spa1
        |--xxx
    |--server 网站后端
        |--src
            |--middlewares
            |--controllers
            |--models
            |--app.ts
        |--public
        |--view
    |--site 网站前端
        |--mpa 多页面应用资源目录
            |--page1
            |--page2
        |--spa1
        |--spa2
        |--xxxx
```

## 为什么要自己配置 webpack

目前社区提供的基于 webpack 的打包方案很多 `umi` `create-react-app` 等，但是查看对应的文档后，它们所能配置的 MPA(多页面应用)，均不是我想要的；

既然很多整合的打包方案基于 webpack,又得知 webpack4 以后配置简化了很多，并且构建速度更快，为什么不按照自己的需求配置一套 webpack 的`MPA`打包方案呢？了解了 webpack 后，再使用 `umi`之类二次封装的工具 会更容易上手

## 为什么不是 fuse-box

fuse-box 它年轻且成熟 并且它足够快,配置也足够简洁一切都是 Typescript 来处理，甚至我认为它比`webpack`要更好.但是自己的段位不够，在配置`fusebox`时总是搞不定 antd 4.0 按需加载的问题

## 使用场景

- 多页面网站 集合服务端模板 每个页面使用`react` `vue` 等 `mvvm` 前端框架开发相互独立
- 维护多个前端工程
- 批量构建

## 如何使用

```js
 * 构建前端
   开发中产出dist目录交给服务端使用 node build.js [`site/map`|`spa1`|`all`]  --watch
   构建生产环境 node build.js all --build
   'site/mpa' 是约定的多页面工程目录
 * 服务端
   在 `/server` 目录 执行 `npm run dev`
 * 构建服务端 `npm run build`
 * 开发环境访问 `/graphql` 来调试 api 接口

```

## TODO

- [x] 支持 MPA、SPA 模式打包
- [x] 抽取 CSS
- [x] 构建优化: 去除 console 等信息、压缩 CSS
- [x] 集成`antd`
- [x] 服务端集成`express` `mongodb` `graphql`
- [x] 添加 `登录` `注册` 接口
- [x] 添加 eslint、prettier 代码风格约束

## 记录

- 前后端的 typescript 全部 采用 babel 来编译，
  + 优点是编译更快，同时可以使用babel的插件比如 按需加载 和 路径别名
- 添加 eslint、prettier 代码风格约束
  + 没有采用社区的风格,仅有一些简单的规则
