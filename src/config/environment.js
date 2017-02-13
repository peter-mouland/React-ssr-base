const debug = require('debug');

const setEnvs = {};
const setEnvDefault = (key, val) => {
  if (!process.env[key]) {
    process.env[key] = val;
  }
  setEnvs[key] = process.env[key];
};

setEnvDefault('DEBUG', 'base:*');
setEnvDefault('NODE_ENV', 'development');
setEnvDefault('PORT', 3000);

debug.enable(process.env.DEBUG);
const log = debug('base: Environment:');

log(setEnvs);
