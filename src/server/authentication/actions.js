import passport from 'koa-passport';

import { validateLoginForm, validateSignUpForm, validateSignUpResponse, validateLoginResponse } from '../../app/authentication/auth-validation';
import localSignupStrategy from './passport/local-signup';
import localLoginStrategy from './passport/local-login';
import { checkUser } from './auth-check-middleware';
import Auth from '../../app/authentication/auth-helper';

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (userId, done) => {
  await checkUser(userId)
    .then((user) => done(null, user))
    .catch(done);
});
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

export const login = async (ctx, next) => {
  ctx.type = 'json';
  const validationResult = validateLoginForm(ctx.request.body);
  if (!validationResult.success) {
    ctx.status = 400;
    ctx.response.body = {
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    };
    return Promise.resolve(ctx);
  }
  return passport.authenticate('local-login', (err, token, userData) => {
    const res = validateLoginResponse(err, token, userData);
    ctx.status = res.status;
    ctx.response.body = res.body;
    Auth.authenticateUser(token, ctx);
  })(ctx, next);
};

export const signUp = (ctx, next) => {
  ctx.type = 'json';
  const validationResult = validateSignUpForm(ctx.request.body);
  if (!validationResult.success) {
    ctx.status = 400;
    ctx.response.body = {
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    };
    return Promise.resolve(ctx);
  }
  return passport.authenticate('local-signup', (signUpError) => {
    const signUpResponse = validateSignUpResponse(signUpError);
    if (signUpResponse.status !== 200) {
      ctx.status = signUpResponse.status;
      ctx.response.body = signUpResponse.body;
      return Promise.resolve(ctx);
    }
    return passport.authenticate('local-login', (loginError, token, userData) => {
      const loginResponse = validateLoginResponse(loginError, token, userData);
      ctx.status = loginResponse.status;
      ctx.response.body = loginResponse.body;
      Auth.authenticateUser(token, ctx);
    })(ctx, next);
  })(ctx, next);
};

export const logout = (ctx, next) => {
  ctx.status = 200;
  ctx.type = 'json';
  Auth.deauthenticateUser(ctx);
  ctx.response.body = { message: 'logged out' };
  next();
};

export const authenticate = async (ctx, next) => {
  ctx.status = 200;
  ctx.type = 'json';
  Auth.authenticateUser(Auth.getToken(), ctx);
  ctx.response.body = { message: 'authenticated' };
  next();
};

export const healthStatus = (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = { status: 'healthy' };
};
