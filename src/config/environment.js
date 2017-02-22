const debug = require('debug');

const setEnvs = {};
const setEnvDefault = (key, val) => {
  if (!process.env[key]) {
    process.env[key] = val;
  }
  setEnvs[key] = process.env[key];
};

setEnvDefault('DEBUG', 'base:*');
setEnvDefault('PORT', 3000);
setEnvDefault('MONGODB_URI', 'mongodb://localhost/react_app');
setEnvDefault('JWT_SECRET', 'a secret phrase!!');

debug.enable(process.env.DEBUG);
const log = debug('base: Environment:');

// explicitly check vars that webpack can help us with
if (!process.env.GA_KEY) { setEnvDefault('GA_KEY', 'development'); }
if (!process.env.NODE_ENV) { setEnvDefault('NODE_ENV', 'development'); }

log(setEnvs);

module.exports = setEnvs;
