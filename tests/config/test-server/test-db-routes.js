import router from 'koa-router';

const users = require('./fixtures/users');

const apiRouter = router({ prefix: '/api' });

const envCheck = (reason = '') => new Promise((resolve, reject) => {
  if (process.env.NODE_ENV === 'production') {
    reject(`Cant ${reason} as you are on production`);
  } else {
    resolve();
  }
});

apiRouter.get('/nuke/:email', async (ctx) => {
  ctx.type = 'json';
  ctx.response.body = { };
  await envCheck('nuke users')
    .then(() => users.nuke({ email: ctx.params.email }))
    .then((nuked) => {
      ctx.response.body = Object.assign(ctx.response.body, { nuked });
      ctx.status = 200;
    }).catch((err) => {
      ctx.status = 500;
      ctx.response.body = { err };
    });
});

export default apiRouter;
