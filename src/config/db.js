const env = require('./environment');

module.exports = {
  dbUri: env.MONGODB_URI,
  jwtSecret: env.JWT_SECRET
};
