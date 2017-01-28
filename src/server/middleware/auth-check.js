/* eslint-disable consistent-return */

const jwt = require('koa-jwt');
const User = require('mongoose').model('User');
const config = require('../../config/db.json');

export default function authCheck() {
  return (ctx, next) => {
    if (!ctx.request.headers.authorization) {
      ctx.response.status = 401;
      ctx.response.body = { message: 'unauthorized' };
    } else {
      return jwt({ secret: config.jwtSecret })(ctx, next);
    }
  };
}

export function getUser() {
  return (ctx, next) => {
    // check if a user exists
    if (ctx.state.user) {
      const userId = ctx.state.user.sub;
      return User.findById(userId, (err, user) => {
        if (err || !user) {
          ctx.response.status = 401;
          ctx.response.body = { message: 'unauthorized' };
        }
        return next({ message: 'logged in' });
      });
    }
  };
}

