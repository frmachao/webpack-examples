# 一个支持多页面构建以及单页面构建的webpack配置
# 服务端集成`express` `mongodb` `graphql` 快速开始开发 支持 TypeScript 编写

> Inspired by `zwh1666258377`

```bash
|--guides 跟随webpack官网指南

|--MPA
    |--build
    |--dist 前端打包后的资源
        |--mpa
            |--page1
            |--page2
        |--spa1
        |--xxx
    |--server 网站后端
        |--middlewares
        |--controllers
        |--models 
        |--public
        |--app.ts
    |--site 网站前端
        |--mpa 多页面应用资源目录
            |--page1
            |--page2
        |--spa1
        |--spa2
        |--xxxx
```

## 为什么要自己配置webpack

目前社区提供的基于webpack的打包方案很多 `umi` `create-react-app` 等，但是查看对应的文档后，它们所能配置的MPA(多页面应用)，均不是我想要的；

既然很多整合的打包方案基于webpack,又得知webpack4以后配置简化了很多，并且构建速度更快，为什么不按照自己的需求配置一套webpack的`MPA`打包方案呢？了解了webpack后，再使用 `umi`之类二次封装的工具 会更容易上手

## 为什么不是 fuse-box

fuse-box 它年轻且成熟 并且它足够快,配置也足够简洁一切都是 Typescript 来处理，甚至我认为它比`webpack`要更好.但是自己的段位不够，在配置`fusebox`时总是搞不定 antd 4.0按需加载的问题

## 使用场景

- 多页面网站 集合服务端模板 每个页面使用`react` `vue` 等 `mvvm` 前端框架开发相互独立
- 维护多个前端工程
- 批量构建

## 如何使用

```js
 * 开发中产出dist目录交给服务端使用 node build.js [`site/map`|`spa1`|`all`]  --watch
 * 构建生产环境 node build.js all --build
 'site/mpa' 是约定的多页面工程目录
 * 启动服务端 在 `MPA/server` 目录 执行 `npx nodemon app.ts` 
 * 开发环境访问 `/graphql` 来调试 api 接口
```
## TODO

- [x] 支持MPA、SPA模式打包
- [x] 抽取CSS
- [x] 构建优化: 去除console等信息、压缩CSS
- [x] 集成`antd`
- [x] 服务端集成`express` `mongodb` `graphql`
- [x] 添加 `登录` `注册` 接口
