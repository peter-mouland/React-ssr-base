import bodyparser from 'koa-bodyparser';
import Router from 'koa-router';
import { graphql } from 'graphql';

import schema, { root } from './graphql/schema';
import handleError from '../middleware/handle-error';
import authCheck from '../authentication/auth-check-middleware';

const router = Router({ prefix: '/graphql/v1' });

router.use(handleError());
router.use(bodyparser({
  enableTypes: ['text'],
  extendTypes: {
    text: ['application/graphql'] // will parse application/x-javascript type body as a JSON string
  }
}));

router.get('/', (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = { status: 'healthy' };
});

router.use(authCheck());

router.post('/', async (ctx) => {
  const { request, context, query } = ctx;
  await graphql(schema, request.body, root, context, query).then((result) => {
    ctx.type = 'json';
    ctx.body = result;
  });
});

export default router;
