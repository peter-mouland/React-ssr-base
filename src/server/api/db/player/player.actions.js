/* eslint-disable no-underscore-dangle */
import debug from 'debug';

const Players = require('mongoose').model('Players');

const log = debug('base:db/player.actions');

export const findPlayers = (players = {}) => Players.find(players).exec();

export const findPlayer = (playerDetails) => Players.findOne(playerDetails).exec();

export const updatePlayers = ({ playerUpdates }) => {
  const bulkUpdate = playerUpdates.map((update) => ({
    updateOne: {
      filter: { _id: update.id }, update
    },
  }));
  return Players.bulkWrite(bulkUpdate).then(() => (playerUpdates));
};
