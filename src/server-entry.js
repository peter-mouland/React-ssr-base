require('babel-polyfill');
const hook = require('node-hook').hook;
const SvgLoader = require('svg-inline-loader');
require('./config/environment');

hook('.scss', () => '');
hook('.svg', (source) => {
  const markup = SvgLoader.getExtractedSVG(source, { removeSVGTagAttrs: false });
  return `module.exports =  ${JSON.stringify(markup)}`;
});

const assets = {
  javascript: ['/vendor.dll.js', '/app.js'],
  styles: ['/app.css']
};
const createServer = require('./server/server'); //eslint-disable-line
createServer(assets).listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
});
