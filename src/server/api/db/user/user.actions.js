/* eslint-disable no-underscore-dangle, no-confusing-arrow */
import { saveNewTeam } from '../team/team.actions';
import { findSeasonById, getLatestSeason } from '../season/season.actions';

const debug = require('debug');
const User = require('mongoose').model('User');

const log = debug('base:db/user.actions');

export const saveNewUser = (userData) => {
  const newUser = new User(userData);
  return newUser.save();
};

export const findOneUser = (userDetails) => User.findOne(userDetails).exec();

export const updateUser = (id, userDetails) =>
  User.findByIdAndUpdate(id, userDetails, { new: true }).exec();

export const addUser = ({ seasonId, leagueId, name, email, password = 'password123' }) => {
  let user;
  const getSeason = (seasonId)
    ? findSeasonById(seasonId)
    : getLatestSeason();

  return Promise.resolve()
    .then(() => saveNewUser({ name, email, password }))
    .then((userInserted) => {
      user = userInserted;
      return getSeason;
    })
    .then((response) => {
      // add default in-case user is added before a season is added i.e. admin user
      const season = response || {};
      log({ season });
      const league = (season && season.leagues && season.leagues.find((lge) => lge.id === leagueId)) || {};
      return saveNewTeam({
        user: { id: user._id, name: user.name },
        season: { id: season._id, name: season.name },
        league: { id: league._id, name: league.name },
      });
    });
};
