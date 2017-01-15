import Router from 'koa-router';
import koaStatic from 'koa-static';
import debug from 'debug';

import setRouterContext from './middleware/set-router-context';
import renderApp from './middleware/render-app';
import apiRouter from './api';
import authRouter from './auth';
import { DIST, PUBLIC } from '../config/paths';

const log = debug('lego:router');
// const oneDay = 1000 * 60 * 60 * 24;
export const router = new Router();

const publicFiles = koaStatic(PUBLIC);
publicFiles._name = 'koaStatic /public'; // eslint-disable-line no-underscore-dangle

const distFiles = koaStatic(DIST);
distFiles._name = 'koaStatic /dist'; // eslint-disable-line no-underscore-dangle

export function setRoutes(assets) {
  log('adding react routes');

  router
    .use(publicFiles)
    .use(distFiles)
    .use(authRouter.routes())
    .use(authRouter.allowedMethods())
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())
    .use(setRouterContext())
    .get('/(.*)', renderApp(assets));
}
