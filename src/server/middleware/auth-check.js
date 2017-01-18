/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config/db.json');

export default function errorHandler() {
  return async (ctx, next) => {
    if (!ctx.request.headers.authorization) {
      ctx.response.status = 401;
    } else {
      // get the last part from a authorization header string like "bearer token-value"
      const token = ctx.request.headers.authorization.split(' ')[1];

      // decode the token using a secret key-phrase
      return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) {
          ctx.response.status = 401;
        } else {
          const userId = decoded.sub;

          // check if a user exists
          return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
              ctx.response.status = 401;
            }

            return next();
          });
        }
      });
    }
  };
}
