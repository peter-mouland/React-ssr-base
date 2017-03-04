/* eslint-disable consistent-return */
import router from 'koa-router';
import koaBody from 'koa-body';
import debug from 'debug';
import jwt from 'koa-jwt';

import config from '../../config/db';
import { login, signUp, logout, authenticate, healthStatus } from './actions';
import authCheck from './auth-check-middleware';
import handleError from '../middleware/handle-error';

const log = debug('base: auth');
const parseBody = koaBody();
const authRouter = router({ prefix: '/auth' });

authRouter.use(handleError());
authRouter.get('/', healthStatus);
authRouter.post('/logout', parseBody, logout);
authRouter.post('/signup', parseBody, signUp);
authRouter.post('/login', parseBody, login);

// move to standard server router
// authRouter.post('/nojs-login', parseBody, async (ctx, next) => {
//   console.log(ctx.request.body.action)
//   const actionPromise = ctx.request.body.action === 'signup'
//      ?  signUp(ctx, next) : login(ctx, next);
//   return actionPromise.then(() => {
//     console.log(ctx.response.body);
//   })
// });

authRouter.use(jwt({ secret: config.jwtSecret, passthrough: true }));
authRouter.use(authCheck());
authRouter.use((ctx) => {
  if (!ctx.context.user) {
    ctx.throw(401, 'unauthorized');
  }
});

// if you can get here, you're JWT is valid
authRouter.post('/authenticate', parseBody, authenticate);

export default authRouter;
