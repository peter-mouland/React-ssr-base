/* eslint-disable no-underscore-dangle */
import debug from 'debug';

const Players = require('mongoose').model('PlayerHistory');

const log = debug('base:db/actions/PlayerHistory');

export const findPlayerHistory = (playerDetails = {}) => new Promise((resolve, reject) => {
  const fn = Object.keys(playerDetails).length > 0 ? 'find' : 'findOne';
  Players[fn](playerDetails, (err, players) => {
    if (err || !players) {
      reject(err || { message: 'no player found' });
    } else {
      resolve(players);
    }
  });
});