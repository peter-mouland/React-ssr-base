/* eslint-disable */
require('babel-core/register')({
  only: [/src/, /tests/, /config/]
});
require("babel-polyfill");
const SvgLoader = require('svg-inline-loader');
const hook = require('node-hook').hook;
const webpackAssets = require('../../../compiled/webpack-assets.json');
const mapWebpackAssets = require('../../../src/server/utils/mapWebpackAssets');
require('../../../src/config/environment');

hook('.scss', (source, filename) => ``);
hook('.svg', (source) => {
  const markup = SvgLoader.getExtractedSVG(source, { removeSVGTagAttrs: false });
  return `module.exports =  ${JSON.stringify(markup)}`;
});

const dbConfig = require('./db.json');
const db = require('../../../src/server/api/db');

const assets = mapWebpackAssets(webpackAssets);
let openServer;

const startLocalServers = (done) => {
  db.connect(dbConfig.dbUri);
  const createServer = require('../../../src/server/server');
  const testDbRouter = require('./test-db-routes');
  const server = createServer(assets);
  server.use(testDbRouter.routes());
  openServer = server.listen(process.env.PORT, () => {
    console.log(`Test Server Listening at http://localhost:${process.env.PORT}`);
    done()
  });
  return openServer
};
const stopLocalServers = (done) => {
  console.log('Closing server...');
  openServer.close(() => {
    db.connection.close(() => {
      done();
      process.exit(0);
    })
  });
};

module.exports = {
  start: startLocalServers,
  stop: stopLocalServers
};
