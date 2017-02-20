const debug = require('debug');
const User = require('mongoose').model('User');

const Auth = require('../../app/authentication/auth-helper');

const log = debug('base:auth-check');

const catcher = (ctx) => {
  ctx.throw(401, 'unauthorized');
};

export const checkUser = (userId) => new Promise((resolve, reject) => {
  User.findById(userId, (err, user) => {
    if (err || !user) {
      reject(err);
    } else {
      resolve(user);
    }
  });
});

export default function authCheck() {
  return (ctx, next) => Promise.resolve(ctx)
      .then(() => Auth.isUserAuthenticated(ctx))
      .then((user) => checkUser(user.sub))
      .catch(() => catcher(ctx))
      .then(next);
}

