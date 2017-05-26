import Router from 'koa-router';
import koaStatic from 'koa-static';
import debug from 'debug';

import setRouterContext from './middleware/set-router-context';
import renderApp from './middleware/render-app';
import graphQLRouter from './api';
import authRouter from './authentication/auth-router';
import { DIST, ASSETS } from '../config/paths';

const log = debug('base:router');
export const router = new Router();

const staticRoute = koaStatic(DIST);
staticRoute._name = 'koaStatic /dist'; // eslint-disable-line no-underscore-dangle


const staticAssetsRoute = koaStatic(ASSETS);
staticAssetsRoute._name = 'koaStatic /assets'; // eslint-disable-line no-underscore-dangle

export function setRoutes(assets) {
  log('adding react routes');

  router
    .use(staticRoute)
    .use(staticAssetsRoute)
    .use(graphQLRouter.routes())
    .use(graphQLRouter.allowedMethods())
    .use(authRouter.routes())
    .use(authRouter.allowedMethods())
    .use(setRouterContext())
    .get('/(.*)', renderApp(assets));
}
