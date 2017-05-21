/* eslint-disable */
require('babel-core/register')({
  only: [/src/, /tests/, /config/]
});
require("babel-polyfill");
const SvgLoader = require('svg-inline-loader');
const hook = require('node-hook').hook;

require('../../src/config/environment');

const webpackAssets = require('../../compiled/webpack-assets.json');
const mapWebpackAssets = require('../../src/server/utils/mapWebpackAssets');
const fixturesServer = require('./fixtures-server');
const dbConfig = require('./db.json');
const db = require('../../src/server/api/db');


hook('.scss', (source, filename) => ``);
hook('.svg', (source) => {
  const markup = SvgLoader.getExtractedSVG(source, { removeSVGTagAttrs: false });
  return `module.exports =  ${JSON.stringify(markup)}`;
});

const assets = mapWebpackAssets(webpackAssets);
const exit = (done = ()=>{}) => {
  done();
  process.exit(0);
};
let openServer;

const startLocalServers = (done) => {
  db.connect(dbConfig.dbUri);
  const createServer = require('../../src/server/server');
  const testDbRouter = require('./test-db-routes');
  const server = createServer(assets);

  if (process.env.FIXTURES === 'true') {
    fixturesServer.start(done);
  } else {
    server.use(testDbRouter.routes());
  }

  openServer = server.listen(process.env.PORT, () => {
    console.log(`Test Server Listening at http://localhost:${process.env.PORT}`);
    done();
  });
  return openServer
};

const stopLocalServers = (done) => {
  console.log('Closing server...');
  openServer.close(() => {

    if (process.env.FIXTURES === 'true') {
      fixturesServer.stop(() => exit(done));
    } else {
      db.connection.close(() => exit(done));
    }

  });
};

module.exports = {
  start: startLocalServers,
  stop: stopLocalServers
};
