const debug = require('debug');

const config = {};
const setEnvDefault = (key, val) => {
  if (!process.env[key]) {
    process.env[key] = val;
  }
  config[key] = process.env[key];
};

setEnvDefault('DEBUG', 'base:*');
setEnvDefault('PORT', 3000);
setEnvDefault('FIXTURES', 'false');
setEnvDefault('FIXTURES_PORT', 3001);
setEnvDefault('MONGODB_URI', 'mongodb://localhost/react_app');
setEnvDefault('JWT_SECRET', 'a secret phrase!!');

const graphQlUrl = config.FIXTURES === 'true'
  ? `http://localhost:${config.FIXTURES_PORT}/graphql`
  : '/graphql/v1';

setEnvDefault('GRAPHQL_URL', graphQlUrl);

const externalStatsUrl = "https://fantasyfootball.skysports.com/cache/json_players.json";
setEnvDefault('EXTERNAL_STATS_URL', externalStatsUrl);

debug.enable(process.env.DEBUG);
const log = debug('base: Environment:');

// explicitly check vars that webpack can help us with
if (!process.env.GA_KEY) { setEnvDefault('GA_KEY', 'development'); }
if (!process.env.NODE_ENV) { setEnvDefault('NODE_ENV', 'development'); }

log(config);

module.exports = config;
module.exports.getVar = (key) => process.env[key];
