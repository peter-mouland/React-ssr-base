/* eslint-disable global-require, no-console */
const mongoose = require('mongoose');
const debug = require('debug');

const log = debug('lego:models');

module.exports.connect = (uri) => {
  mongoose.connect(uri);
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // load models
  require('./user');
};
