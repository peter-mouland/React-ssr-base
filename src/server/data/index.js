const bodyparser = require('koa-bodyparser');
const { graphql } = require('graphql');

import schema, { root } from './graphql/schema';

const Router = require('koa-router');
const router = Router({ prefix: '/graphql/v1' });

const errorHandler = async (ctx, next) => {
  try {
    await next(); // next is now a function
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
};

router.use(errorHandler);
router.use(bodyparser({
  enableTypes: ['text'],
  extendTypes: {
    text: ['application/graphql'] // will parse application/x-javascript type body as a JSON string
  }
}));

router.post('/', async (ctx, next) => {
  await graphql(schema, ctx.request.body, root).then((result) => {
    ctx.type = 'json';
    ctx.body = result;
  });
});

export default router;
