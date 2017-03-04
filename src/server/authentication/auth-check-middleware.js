import debug from 'debug';
import mongoose from 'mongoose';

import Auth from '../../app/authentication/auth-helper';

const User = mongoose.model('User');
const log = debug('base:auth-check');

export const validateUser = (ctx) => new Promise((resolve) => {
  const userFromToken = Auth.validateToken(ctx);
  User.findById(userFromToken.sub, (err, user) => {
    ctx.context = { user };
    resolve(user);
  });
});

export default function authCheck() {
  return (ctx, next) => Promise.resolve(ctx)
      .then(validateUser)
      .then(next);
}

