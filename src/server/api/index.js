import router from 'koa-router';
import jwt from 'koa-jwt';

import authCheck from '../authentication/auth-check-middleware';
import handleError from '../middleware/handle-error';

const config = require('../../config/db.js');
const users = require('../../../tests/config/fixtures/users');

const apiRouter = router({ prefix: '/api' });

export const envCheck = () => new Promise((resolve, reject) => {
  if (process.env.NODE_ENV === 'production') {
    reject('Cant load fixtures as you are on \'production\'');
  } else {
    resolve();
  }
});

apiRouter.use(handleError());

apiRouter.get('/', (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = { status: 'healthy' };
});

apiRouter.get('/nuke/:email', async (ctx) => {
  ctx.type = 'json';
  ctx.response.body = { };
  await envCheck()
    .then(() => users.nuke({ email: ctx.params.email })).then((nuked) => {
      ctx.response.body = Object.assign(ctx.response.body, { nuked });
      ctx.status = 200;
    }).catch((err) => {
      ctx.status = 500;
      ctx.response.body = { err };
    });
});

apiRouter.use(jwt({ secret: config.jwtSecret }));
apiRouter.use(authCheck());

apiRouter.get('/dashboard', (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = { message: "You're authorized to see this secret message." };
});

export default apiRouter;
