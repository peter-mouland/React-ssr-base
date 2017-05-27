/* eslint-disable no-underscore-dangle */

require('../src/config/environment');
const connect = require('../src/server/api/db').connect;
const config = require('../src/config/db.js');
const players = require('./2016-2017/stats-GW25.json');
const { forPlayer: calculatePoints } = require('../src/server/utils/calculatePoints');

connect(config.dbUri);

const Player = require('mongoose').model('Players');

Object.keys(players).forEach(key => {
  const player = players[key];
  const stats = {
    apps: player.apps,
    subs: player.subs,
    gls: player.gls,
    asts: player.asts,
    mom: player.mom,
    cs: player.cs,
    con: player.con,
    pensv: player.pensv,
    ycard: player.ycard,
    rcard: player.rcard,
  };
  player.gameWeek = {
    stats,
    points: calculatePoints(stats, player.pos)
  };
  player.total = {
    stats,
    points: calculatePoints(stats, player.pos)
  };
  player.name = player.player;
  const newPlayer = new Player(player);
  console.log(newPlayer)
  console.log('add..')
  newPlayer.save((err) => {
    console.log(player)
    if (err) { return console.log(err); }
  });
});


