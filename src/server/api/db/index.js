/* eslint-disable global-require, no-console */
const mongoose = require('mongoose');
const debug = require('debug');

const log = debug('base:models');
let connected = false;

module.exports.connect = (uri) => {
  if (connected) return;
  connected = true;

  mongoose.connect(uri);
  mongoose.Promise = global.Promise;
  console.log(uri);
  mongoose.connection.on('error', (err) => {
    log(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  mongoose.connection.on('connected', () => {
    log(`Mongoose default connection open to ${uri}`);
  });
  mongoose.connection.on('disconnected', () => {
    log('Mongoose default connection disconnected');
  });

// If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  // load models
  require('./models/user');
  require('./models/player');
  require('./models/team');
  require('./models/season');
};

module.exports.connection = mongoose.connection;
