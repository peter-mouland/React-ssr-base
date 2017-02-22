/* eslint-disable */
const argv = require('yargs')
  .usage('Usage: $0 --target=[string] --sha=[string]')
  .argv;
process.env.PORT = 3210;
require('../../src/config/environment');
require('babel-core/register')({
  only: [/src/, /tests/, /config/]
});
require("babel-polyfill");

const SvgLoader = require('svg-inline-loader');
const hook = require('node-hook').hook;
hook('.scss', (source, filename) => ``);
hook('.svg', (source) => {
  const markup = SvgLoader.getExtractedSVG(source, { removeSVGTagAttrs: false });
  return `module.exports =  ${JSON.stringify(markup)}`;
});

const TARGET_PATH = argv.target || `http://localhost:${process.env.PORT}`;
const needLocalServer = TARGET_PATH.indexOf('localhost') > -1;

// build assets array from webpack bundle for test pages
const webpackAssets = require('../../compiled/webpack-assets.json');
const mapWebpackAssets = require('../../src/server/utils/mapWebpackAssets');
const assets = mapWebpackAssets(webpackAssets);


// Connect to test DB (needed for functional tests)
const localDbConfig = require('./db.json');
const appDbConfig = require('../../src/config/db.js');
const db = require('../../src/server/models');
const dbConfig = needLocalServer ? localDbConfig : appDbConfig;
db.connect(dbConfig.dbUri);
// fixtures must come after the db.connect
const fixtures = require('./fixtures');
const loadFixtures = argv.tag === 'staging' ? fixtures : Promise.resolve;

const startLocalServers = (done) => {
  loadFixtures().then(()=> {
    const createServer = require('../../src/server/server');
    openServer = createServer(assets).listen(process.env.PORT, () => {
      console.log(`listening at http://localhost:${process.env.PORT}`);
      done()
    });
  });
};
const stopLocalServers = (done) => {
  console.log('Closing server...');
  openServer.close(() => db.connection.close(done));
};
const noop = (done) => { done(); };
let openServer;

module.exports = (function(settings) {
  var buildString = "";
  if (argv.sha) {
    buildString += argv.sha
  } else {
    buildString += 'local ' + Date.now();
    buildString = buildString.substring(0, buildString.length - 4);
  }

  settings.test_settings.default.globals = {
    TARGET_PATH : TARGET_PATH,
    before:  needLocalServer ? startLocalServers : noop,
    after: needLocalServer ? stopLocalServers : noop
  };
  settings.test_settings.default.desiredCapabilities['browserstack.local'] = needLocalServer;
  settings.test_settings.default.desiredCapabilities['browserstack.user'] = argv.bsuser || process.env.BROWSERSTACK_USER;
  settings.test_settings.default.desiredCapabilities['browserstack.key'] = argv.bskey || process.env.BROWSERSTACK_KEY;
  settings.test_settings.default.desiredCapabilities['build'] = buildString;
  return settings;
})(require('./nightwatch.json'));
