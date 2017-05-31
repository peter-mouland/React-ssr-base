/* eslint-disable no-underscore-dangle, no-confusing-arrow */
import { findOneUser, saveNewUser } from './db/user/user.actions';
import { findPlayers, findPlayer, updatePlayers } from './db/player/player.actions';
import { updateTeam, findTeams, saveNewTeam } from './db/team/team.actions';
import { findSeasons, saveNewLeague, saveNewSeason, findSeasonById } from './db/season/season.actions';

const getUser = ({ email, id }) => findOneUser({ _id: id, email });
const getPlayers = ({ player }) => player ? findPlayer({ player }) : findPlayers();
const getDashboard = (args, context) => (context.user)
    ? ({ message: "You're authorized to see this secret message." })
    : ({ message: 'default message' });

const addUser = ({ seasonId, leagueId, name, email }) => {
  let user;
  return saveNewUser({ name, email, password: 'password123' })
    .then((userInserted) => {
      user = userInserted;
      return findSeasonById(seasonId);
    })
    .then((season) => {
      const league = season.leagues.find((lge) => lge.id === leagueId);
      return saveNewTeam({
        user: { id: user._id, name: user.name },
        season: { id: season._id, name: season.name },
        league: { id: league._id, name: league.name },
      });
    });
};

// The root provides the top-level API endpoints
export default {
  getPlayers,
  getSeasons: findSeasons,
  getTeams: findTeams,
  getUser,
  addSeason: saveNewSeason,
  addLeague: saveNewLeague,
  addUser,
  updatePlayers,
  updateTeam,
  getDashboard,
};
