/* eslint-disable no-underscore-dangle */
import debug from 'debug';
import { findSeasons, findSeasonById, saveNewLeague, saveNewSeason } from '../../db/season/season.actions';
import { saveNewUser } from '../../db/user/user.actions';
import { saveNewTeam } from '../../db/team/team.actions';

const log = debug('base:graphql/seasons');

const schema = (`
  type League {
    _id: String
    name: String
    tier: Int
  }
  type Season {
    _id: String!
    name: String
    isLive: Boolean
    currentGW: Int
    leagues: [League]
  }
`);

export const addUser = ({ seasonId, leagueId, name, email }) => {
  let user;
  return saveNewUser({ name, email })
    .then((userInserted) => {
      user = userInserted;
      return findSeasonById(seasonId);
    })
    .then((season) => {
      const league = season.leagues.find((lge) => lge.id === leagueId);
      return saveNewTeam({
        user: { id: user._id, name: user.name },
        season: { id: season._id, name: season.name },
        league: { id: league._id, name: league.name }
      });
    })
    .then(() => user);
};


export const getSeasons = findSeasons;
export const seasonQuery = 'getSeasons: [Season]';

export const addSeason = saveNewSeason;
export const seasonMutation = 'addSeason(name: String): Season';

export const addLeague = saveNewLeague;
export const leagueMutation = 'addLeague(seasonId: String, name: String): Season';

export const addUserMutation = 'addUser(seasonId: String, leagueId: String, email: String, name: String): User';

export default schema;
