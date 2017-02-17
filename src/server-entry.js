require('babel-polyfill');
const hook = require('node-hook').hook;
const SvgLoader = require('svg-inline-loader');

const connect = require('./server/models').connect;
const config = require('./config/db.js');
const webpackAssets = require('./webpack-assets.json');
const mapWebpackAssets = require('./server/utils/mapWebpackAssets');
require('./config/environment');

hook('.scss', () => '');
hook('.svg', (source) => {
  const markup = SvgLoader.getExtractedSVG(source, { removeSVGTagAttrs: false });
  return `module.exports =  ${JSON.stringify(markup)}`;
});

connect(config.dbUri);

const assets = mapWebpackAssets(webpackAssets);
const createServer = require('./server/server'); //eslint-disable-line
createServer(assets).listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
});
