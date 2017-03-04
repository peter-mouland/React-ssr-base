import debug from 'debug';
import mongoose from 'mongoose';

import Auth from '../../app/authentication/auth-helper';

const User = mongoose.model('User');
const log = debug('base:auth-check');

// const catcher = (ctx) => {
//   ctx.throw(401, 'unauthorized');
// };

export const validateUser = (userId) => new Promise((resolve) => {
  User.findById(userId, (err, user) => {
    resolve(user);
  });
});

export default function authCheck() {
  return (ctx, next) => Promise.resolve(ctx)
      .then(() => Auth.validateToken(ctx))
      .then((user = {}) => validateUser(user.sub))
      .then((user) => { ctx.context = { user }; })
      .then(next);
}

