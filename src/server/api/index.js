import router from 'koa-router';
import koaBody from 'koa-body';
import debug from 'debug';

import fetchProducts from './fetch-products';
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

apiRouter.get('/products', parseBody, async (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = await fetchProducts();
});

export default apiRouter;
