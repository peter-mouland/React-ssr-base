const bodyparser = require('koa-bodyparser');
const { graphql } = require('graphql');

const schema = require('./graphql/schema');

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

router.post('/', async function (ctx, next) {
  await graphql(schema, ctx.request.body)
    .then((result) => {
    console.log(result)
      ctx.type = 'json';
      ctx.body = result;
    });
});

export default router;
