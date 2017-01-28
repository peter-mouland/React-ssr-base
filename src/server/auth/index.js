/* eslint-disable consistent-return */
import router from 'koa-router';
import koaBody from 'koa-body';
import passport from 'koa-passport';

import { validateLoginForm, validateSignupForm, validateSignupResponse, validateLoginResponse } from './validate';
import handleError from '../middleware/handle-error';
import localSignupStrategy from '../passport/local-signup';
import localLoginStrategy from '../passport/local-login';

const parseBody = koaBody();
const authRouter = router({ prefix: '/auth' });

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

authRouter.post('/signup', parseBody, (ctx, next) => {
  ctx.type = 'json';
  const validationResult = validateSignupForm(ctx.request.body);
  if (!validationResult.success) {
    ctx.status = 400;
    ctx.response.body = {
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    };
  } else {
    return passport.authenticate('local-signup', (err) => {
      const res = validateSignupResponse(err);
      ctx.status = res.status;
      ctx.response.body = res.body;
    })(ctx, next);
  }
});

authRouter.post('/login', parseBody, async (ctx, next) => {
  ctx.type = 'json';
  const validationResult = validateLoginForm(ctx.request.body);
  if (!validationResult.success) {
    ctx.status = 400;
    ctx.response.body = {
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    };
  } else {
    return passport.authenticate('local-login', (err, token, userData) => {
      const res = validateLoginResponse(err, token, userData);
      ctx.status = res.status;
      ctx.response.body = res.body;
    })(ctx, next);
  }
});

authRouter.use(handleError());

export default authRouter;
