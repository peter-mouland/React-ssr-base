/* eslint-disable consistent-return */
import router from 'koa-router';
import koaBody from 'koa-body';
import passport from 'koa-passport';
import debug from 'debug';

import { validateLoginForm, validateSignUpForm, validateSignUpResponse, validateLoginResponse } from '../../app/authentication/auth-validation';
import { checkUser } from './auth-check-middleware';
import localSignupStrategy from './passport/local-signup';
import localLoginStrategy from './passport/local-login';
import Auth from '../../app/authentication/auth-helper';

const log = debug('lego: auth');
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
          ctx.session.authorization = `Bearer ${token}`;
          Auth.authenticateUser(token);
        })(ctx, next);
      }
      ctx.status = signUpResponse.status;
      ctx.response.body = signUpResponse.body;
    })(ctx, next);
  }
});

authRouter.post('/login', parseBody, async (ctx, next) => {
  log('/login', { session: ctx.session });
  log('/login', { cookie: ctx.cookies.get('session') });
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
      ctx.session.authorization = `Bearer ${token}`;
      Auth.authenticateUser(token);
    })(ctx, next);
  }
});

authRouter.post('/logout', parseBody, (ctx, next) => {
  ctx.status = 200;
  ctx.type = 'json';
  ctx.session.authorization = false;
  Auth.deauthenticateUser();
  ctx.response.body = { message: 'logged out' };
  next();
});

authRouter.use(() => async (ctx, next) => {
  try {
    await next(); // attempt to invoke the next middleware downstream
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      log(err); // send to real logging system
    } else {
      log(err);
    }
    ctx.response.status = err.status || 500;
    ctx.type = 'json';
    ctx.body = { error: err };
    ctx.app.emit('error', err, ctx);
  }
});

export default authRouter;
