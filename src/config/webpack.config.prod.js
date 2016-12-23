const { SRC } = require('./paths');
const defaultConfig = require('./webpack.common');

const prodConfig = Object.assign({}, defaultConfig, {
  entry: { app: [`${SRC}/client-entry.js`] }
});

module.exports = prodConfig;
