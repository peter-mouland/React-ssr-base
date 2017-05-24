import debug from 'debug';

import { findOneUser, saveNewUser } from '../../db/user/user.actions';
import { findSeasonById, updateSeasonById } from '../../db/season/season.actions';

const log = debug('base:graphql/seasons');

const schema = (`
  type User {
    _id: String!
    email: String!
    name: String
  }
`);

export const addUserAndAssignToLeague = ({ seasonId, leagueId, name, email }) => {
  let userId;
  return saveNewUser({ name, email })
    .then((user) => {
      userId = user._id;
      return findSeasonById(seasonId);
    })
    .then((season) => {
      const league = season.leagues.find((league) => String(league._id) === String(leagueId));
      console.log({ league });
      const newLeague = {
        ...league,
        users: [
          ...league.users,
          { userId }
        ]
      };
      console.log({ newLeague });
      const newSeason = {
        ...season,
        leagues: [
          ...season.leagues,
          newLeague
        ]
      };
      console.log({ newSeason });
      return updateSeasonById(season._id, newSeason);
    });
};

export const userMutation = 'addUserAndAssignToLeague(seasonId: String, leagueId: String, email: String, name: String): User';

export const getUser = ({ email, id }) => findOneUser({ _id: id, email });
export const userQuery = 'getUser(email: String, id: String): User';

export default schema;
