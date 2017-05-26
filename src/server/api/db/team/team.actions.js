/* eslint-disable no-underscore-dangle */
import debug from 'debug';

const Team = require('mongoose').model('Teams');

const log = debug('base:db/team.actions');

export const saveNewTeam = (teamData) => new Promise((resolve, reject) => {
  const newTeam = new Team(teamData);
  newTeam.save((err, team) => {
    if (err) { return reject(err); }
    return resolve(team);
  });
});

export const findTeams = (search = {}) => new Promise((resolve, reject) => {
  Team.find(search, (err, team) => {
    if (err || !team) {
      reject(err || { message: 'no season found' });
    } else {
      resolve(team);
    }
  });
});
