import express, { Application, Response } from 'express';
import mongoose from 'mongoose';
import mongo from 'connect-mongo'; // 一般用来将session存储到数据库中
import session from 'express-session';
import nunjucks from 'nunjucks';
import { MONGODB_URI, SESSION_SECRET } from '@/utils/secrets';
import { reqLog } from '@/middlewares/log';
import setRoutes from './router';

import path from 'path';

const MongoStore = mongo(session);
const app: Application = express();
// Connect to MongoDB
mongoose.Promise = Promise;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected!!'))
  .catch((err: Error) => console.error(err));
// 设置后端模板引擎
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'njk');
nunjucks.configure('views', { autoescape: true, express: app, noCache: true }); // noCache生产环境要关闭
// 后端静态资源
app.use('/static', express.static(path.join(__dirname, 'public')));
// 设置前端资源路径
app.use('/fe-static', express.static(path.join(__dirname, '../../dist')));
// 处理请求正文中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 处理seesion
app.use(
  session({
    resave: true, // 强制保存session
    saveUninitialized: true, // 强制保存未初始化内容
    secret: SESSION_SECRET, // 加密字符串
    //30 days，cookie 的生存期，毫秒为单位，过期后cookie的sessionID就自动删除了
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    store: new MongoStore({
      //将session存进数据库
      url: MONGODB_URI,
      autoReconnect: true,
    }),
  })
);
app.use(reqLog);
// 设置路由
setRoutes(app);
app.use((req, res) => {
  res.status(404).send('Not Found');
});
// 错误处理
app.use((err: Error, req, res: Response, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// 启动服务
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
});
