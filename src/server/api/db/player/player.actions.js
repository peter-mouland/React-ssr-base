/* eslint-disable no-underscore-dangle */
import debug from 'debug';

const Players = require('mongoose').model('Players');

const log = debug('base:db/player.actions');

export const findPlayers = () => new Promise((resolve, reject) => {
  Players.find({}, (err, players) => {
    if (err || !players) {
      reject(err || { message: 'no player found' });
    } else {
      resolve(players);
    }
  });
});

export const findPlayer = (playerDetails) => new Promise((resolve, reject) => {
  Players.findOne(playerDetails, (err, user) => {
    if (err || !user) {
      reject(err || { message: 'no player found' });
    } else {
      resolve(user);
    }
  });
});
