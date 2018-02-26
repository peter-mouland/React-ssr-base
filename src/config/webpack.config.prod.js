require('./environment');
const { SRC } = require('./paths');
const defaultConfig = require('./webpack.common');

const prodConfig = Object.assign({}, defaultConfig, {
  mode: 'production',
  entry: {
    app: [`${SRC}/client-entry.js`],
    vendor: [`${SRC}/vendor.js`]
  }
});

console.log({ prodConfig });

module.exports = prodConfig;
