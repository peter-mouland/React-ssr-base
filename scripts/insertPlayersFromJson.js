/* eslint-disable no-underscore-dangle */

require('../src/config/environment');
const connect = require('../src/server/api/db').connect;
const config = require('../src/config/db.js');
const players = require('./players-16-17.json');

connect(config.dbUri);

const Player = require('mongoose').model('Players');

Object.keys(players).forEach(key => {
  const player = players[key];
  const newPlayer = new Player(player);
  console.log('add..')
  newPlayer.save((err) => {
    console.log(player)
    if (err) { return console.log(err); }
  });
});

