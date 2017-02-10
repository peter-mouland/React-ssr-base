/* eslint-disable global-require, no-console */
const mongoose = require('mongoose');
const debug = require('debug');

const log = debug('lego:models');

module.exports.connect = (uri) => {
  mongoose.connect(uri);
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    log(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  mongoose.connection.on('connected', function () {
    log('Mongoose default connection open to ' + uri);
  });
  mongoose.connection.on('disconnected', function () {
    log('Mongoose default connection disconnected');
  });

// If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  // load models
  require('./user');
};

module.exports.connection = mongoose.connection;
