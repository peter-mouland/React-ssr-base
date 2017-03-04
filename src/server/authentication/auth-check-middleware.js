import debug from 'debug';
import mongoose from 'mongoose';
import jwt from 'koa-jwt';

import config from '../../config/db';
import Auth from '../../app/authentication/auth-helper';

const User = mongoose.model('User');
const log = debug('base:auth-check');

export const validateUser = (userId) => new Promise((resolve) => {
  User.findById(userId, (err, user) => {
    resolve(user);
  });
});

export default function authCheck() {
  return (ctx, next) => Promise.resolve(ctx)
      .then(() => jwt({ secret: config.jwtSecret, passthrough: true })(ctx, next))
      .then(() => Auth.validateToken(ctx))
      .then((user = {}) => validateUser(user.sub))
      .then((user) => { ctx.context = { user }; })
      .then(next);
}

