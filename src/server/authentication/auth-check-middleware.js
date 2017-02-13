/* eslint-disable consistent-return, no-confusing-arrow */

const jwt = require('koa-jwt');
const debug = require('debug');
const User = require('mongoose').model('User');

const config = require('../../config/db.json');
const Auth = require('../../app/authentication/auth-helper');

const log = debug('lego:auth-check');

const catcher = (ctx) => {
  ctx.response.status = 401;
  ctx.response.body = { message: 'unauthorized' };
};

const hasAuthorizationHeader = (ctx) => new Promise((resolve, reject) => {
  if (!ctx.request.headers.authorization) {
    reject();
  } else {
    resolve(ctx);
  }
});

const setJwt = (ctx) => new Promise((resolve, reject) => {
  jwt({ secret: config.jwtSecret })(ctx, () => {
    if (ctx.state.user) {
      resolve(ctx);
    } else {
      reject();
    }
  });
});

export const checkUser = (userId) => new Promise((resolve, reject) => {
  User.findById(userId, (err, user) => {
    if (err || !user) {
      reject(err);
    } else {
      resolve(user);
    }
  });
});

const isAuthorised = (ctx) => new Promise((resolve, reject) => Auth.isUserAuthenticated()
    ? resolve(ctx)
    : reject());

export default function authCheck() {
  return (ctx, next) => hasAuthorizationHeader(ctx)
      .then(isAuthorised)
      .then(setJwt)
      .then(() => checkUser(ctx.state.user.sub))
      .catch(() => catcher(ctx))
      .then(next);
}

