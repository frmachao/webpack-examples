import { Request, Response, Application } from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './controllers/graphql';
import { getStatic } from '@/utils/common';

const setRoutes = (app: Application) => {
  app.get('/', (req: Request, res: Response) => {
    res.render('home');
  });
  app.use(
    '/graphql',
    graphqlHTTP((req) => {
      return {
        schema,
        graphiql: true,
        context: { req },
      };
    })
  );
  app.use('/blog', (req, res) => {
    const staticPath = '/mpa/manifest.json';
    res.render('index', getStatic({ prefix: 'blog/', staticPath, title: 'blog' }));
  });
  app.use('/game', (req, res) => {
    const staticPath = '/mpa/manifest.json';
    res.render('index', getStatic({ prefix: 'game/', staticPath, title: 'game' }));
  });
  app.use('/spa1', (req, res) => {
    const staticPath = '/spa1/manifest.json';
    res.render('index', getStatic({ staticPath, title: 'spa1' }));
  });
  app.use('/spa2', (req, res) => {
    const staticPath = '/spa2/manifest.json';
    res.render('index', getStatic({ staticPath, title: 'spa2' }));
  });
};
export default setRoutes;
