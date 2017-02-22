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

debug.enable(process.env.DEBUG);
const log = debug('base: Environment:');

// explicitly set vars that webpack can help us with
if (!process.env.NODE_ENV) { process.env.NODE_ENV = 'development'; }
setEnvs.NODE_ENV = process.env.NODE_ENV;

log(setEnvs);

module.exports = setEnvs;
