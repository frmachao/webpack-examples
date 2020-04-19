import { Request, Response, Application, NextFunction } from "express";
import graphqlHTTP from "express-graphql";
import schema from "./controllers/graphql";

// const feStatic = path.join(__dirname, '../../../front/dist');
const setRoutes = (app: Application) => {
  app.get("/", (req: Request, res: Response) => {
    res.render("home");
  });
  app.use(
    "/graphql",
    graphqlHTTP((req) => {
      return {
        schema,
        graphiql: true,
        context: { req },
      };
    })
  );
  app.use("/blog", (req, res) => {
    res.render("index", {
      title: "game",
      // 生成维系各各代码块关系的代码
      manifest: "/fe-static/mpa/runtime.js",
      // 打包后的依赖文件
      venderJs: "/fe-static/mpa/vendors.js",
      venderCSS: "/fe-static/mpa/vendors.css",
      // 业务代码
      app: "/fe-static/mpa/blog/index.js",
    });
  });
  app.use("/game", (req, res) => {
    res.render("index", {
      title: "game",
      // 生成维系各各代码块关系的代码
      manifest: "/fe-static/mpa/runtime.js",
      // 打包后的依赖文件
      venderJs: "/fe-static/mpa/vendors.js",
      venderCSS: "/fe-static/mpa/vendors.css",
      // 业务代码
      app: "/fe-static/mpa/game/index.js",
    });
  });
  app.use("/spa1", (req, res) => {
    res.render("spa", {
      title: "spa1",
      // 生成维系各各代码块关系的代码
      manifest: "/fe-static/spa1/runtime.js",
      // 打包后的依赖文件
      venderJs: "/fe-static/spa1/vendors.js",
      venderCSS: "/fe-static/spa1/vendors.css",
      // 业务代码
      app: "/fe-static/mpa/game/index.js",
    });
  });
  app.use("/spa2", (req, res) => {
    res.render("spa", {
      title: "spa2",
      // 生成维系各各代码块关系的代码
      manifest: "/fe-static/spa2/runtime.js",
      // 打包后的依赖文件
      venderJs: "/fe-static/spa2/vendors.js",
      venderCSS: "/fe-static/spa2/vendors.css",
      // 业务代码
      app: "/fe-static/spa2/index.js",
    });
  });
};
export default setRoutes;
