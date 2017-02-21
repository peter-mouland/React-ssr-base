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

// Connect to test DB (needed for functional tests)
const db = require('../../src/server/models');
const config = require('./db.json');
db.connect(config.dbUri);
const loadFixtures = require('./fixtures');

// build assets array from webpack bundle for test pages
const webpackAssets = require('../../compiled/webpack-assets.json');
const mapWebpackAssets = require('../../src/server/utils/mapWebpackAssets');
const assets = mapWebpackAssets(webpackAssets);
const needLocalServer = !argv.target;
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
  settings.test_settings.default.globals = {
    TARGET_PATH : argv.target || `http://localhost:${process.env.PORT}`,
    before:  needLocalServer ? startLocalServers : noop,
    after: needLocalServer ? stopLocalServers : noop
  };
  settings.test_settings.default.desiredCapabilities['browserstack.user'] = argv.bsuser || process.env.BROWSERSTACK_USER;
  settings.test_settings.default.desiredCapabilities['browserstack.key'] = argv.bskey || process.env.BROWSERSTACK_KEY;
  settings.test_settings.default.desiredCapabilities['build'] = (argv.sha) ? argv.sha : ' local ';
  return settings;
})(require('./nightwatch.json'));
