/* eslint-disable no-underscore-dangle, no-confusing-arrow */
import { findOneUser, addUser } from './db/user/user.actions';
import { findPlayers, findPlayer, updatePlayers } from './db/player/player.actions';
import { updateTeam, getTeams, getTeam } from './db/team/team.actions';
import { getSeasons, addLeague, addSeason } from './db/season/season.actions';

const getUser = ({ email, id }) => findOneUser({ _id: id, email });
const getPlayers = ({ player }) => player ? findPlayer({ player }) : findPlayers();
const getDashboard = (args, context) => (context.user)
    ? ({ message: "You're authorized to see this secret message." })
    : ({ message: 'default message' });

// The root provides the top-level API endpoints
export default {
  getPlayers,
  getSeasons,
  getTeams,
  getTeam,
  getUser,
  addSeason,
  addLeague,
  addUser,
  updatePlayers,
  updateTeam,
  getDashboard,
};
