/* eslint-disable consistent-return */
import router from 'koa-router';
import koaBody from 'koa-body';
import passport from 'koa-passport';
import debug from 'debug';
import jwt from 'koa-jwt';

import { validateLoginForm, validateSignUpForm, validateSignUpResponse, validateLoginResponse } from '../../app/authentication/auth-validation';
import authCheck, { checkUser } from './auth-check-middleware';
import localSignupStrategy from './passport/local-signup';
import localLoginStrategy from './passport/local-login';
import Auth from '../../app/authentication/auth-helper';
import handleError from '../middleware/handle-error';

const config = require('../../config/db.json');

const log = debug('base: auth');
const parseBody = koaBody();
const authRouter = router({ prefix: '/auth' });

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (userId, done) => {
  await checkUser(userId)
    .then((user) => done(null, user))
    .catch(done);
});
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

authRouter.use(handleError());

authRouter.get('/', (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = { status: 'healthy' };
});

authRouter.post('/signup', parseBody, (ctx, next) => {
  ctx.type = 'json';
  const validationResult = validateSignUpForm(ctx.request.body);
  if (!validationResult.success) {
    ctx.status = 400;
    ctx.response.body = {
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    };
  } else {
    return passport.authenticate('local-signup', (signUpError) => {
      const signUpResponse = validateSignUpResponse(signUpError);
      if (signUpResponse.status === 200) {
        return passport.authenticate('local-login', (loginError, token, userData) => {
          const loginResponse = validateLoginResponse(loginError, token, userData);
          ctx.status = loginResponse.status;
          ctx.response.body = loginResponse.body;
          Auth.authenticateUser(token, ctx);
        })(ctx, next);
      }
      ctx.status = signUpResponse.status;
      ctx.response.body = signUpResponse.body;
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
      Auth.authenticateUser(token, ctx);
    })(ctx, next);
  }
});

authRouter.post('/logout', parseBody, (ctx, next) => {
  ctx.status = 200;
  ctx.type = 'json';
  Auth.deauthenticateUser(ctx);
  ctx.response.body = { message: 'logged out' };
  next();
});

authRouter.use(jwt({ secret: config.jwtSecret }));
authRouter.use(authCheck());

// if you can get here, you're JWT is valid
authRouter.post('/authenticate', parseBody, async (ctx, next) => {
  ctx.status = 200;
  ctx.type = 'json';
  Auth.authenticateUser(Auth.getToken(), ctx);
  ctx.response.body = { message: 'authenticated' };
  next();
});

export default authRouter;
