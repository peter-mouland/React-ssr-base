/* eslint-disable */
const argv = require('yargs')
  .usage('Usage: $0 --target=[string] --sha=[string] --bskey=[string] --bsuser=[string]')
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
const webpackAssets = require('../../src/webpack-assets.json');
const mapWebpackAssets = require('../../src/server/utils/mapWebpackAssets');
const assets = mapWebpackAssets(webpackAssets);

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
    TARGET_PATH : argv.target || `http://localhost:${process.env.PORT}`,
    before:  function(done) {
      loadFixtures().then(()=>{
        const createServer = require('../../src/server/server'); //eslint-disable-line
        openServer = createServer(assets).listen(process.env.PORT, () => {
          console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
          done()
        });
      });
    },
    after: function(done) {
      return openServer.close(() => db.connection.close(done));
    }
  };
  settings.test_settings.default.desiredCapabilities['browserstack.user'] = argv.bsuser || process.env.BROWSERSTACK_USER;
  settings.test_settings.default.desiredCapabilities['browserstack.key'] = argv.bskey || process.env.BROWSERSTACK_KEY;
  settings.test_settings.default.desiredCapabilities['build'] = buildString;
  return settings;
})(require('./nightwatch.json'));
