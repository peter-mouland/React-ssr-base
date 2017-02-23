import router from 'koa-router';
import koaBody from 'koa-body';
import debug from 'debug';

import fetchOrders from './fetch-orders';
import handleError from '../middleware/handle-error';

const log = debug('base:api');
const parseBody = koaBody();
const apiRouter = router({ prefix: '/api' });

apiRouter.use(handleError());

apiRouter.get('/', (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = { status: 'healthy' };
});

apiRouter.get('/orders', parseBody, async (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = await fetchOrders();
});

export default apiRouter;
