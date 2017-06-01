/* eslint-disable no-underscore-dangle */
import debug from 'debug';

const Team = require('mongoose').model('Team');

const log = debug('base:db/team.actions');

export const saveNewTeam = (teamData) => {
  const newTeam = new Team(teamData);
  return newTeam.save();
};

export const getTeams = (search = {}) => Team.find(search).exec();

export const getTeam = ({ leagueId }, context) => {
  if (!leagueId) {
    // find league id first
    return Team.find({ user: { id: context.user._id } }).exec().then((team) => console.log(team) || team);
  }
  return Team.find({ user: { id: context.user._id }, league: { id: leagueId } }).exec();
};

export const updateTeam = (team) => team;
