/* eslint-disable no-underscore-dangle */
import debug from 'debug';
const Team = require('mongoose').model('Teams');

const log = debug('base:graphql/team');


export const saveNewTeam = (teamData) => new Promise((resolve, reject) => {
  const newTeam = new Team(teamData);
  newTeam.save((err, team) => {
    if (err) { return reject(err); }
    return resolve(team);
  });
});
