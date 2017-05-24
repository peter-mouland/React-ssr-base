import debug from 'debug';

const log = debug('base:graphql/seasons');

import { findSeasons, saveNewLeague, saveNewSeason } from '../../db/season/season.actions';

const schema = (`
  type UserLink {
    userId: String
  }
  type League {
    _id: String
    name: String
    tier: Int
    users: [UserLink]
  }
  type Season {
    _id: String!
    name: String
    isLive: Boolean
    currentGW: Int
    leagues: [League]
  }
`);

export const getSeasons = findSeasons;
export const seasonQuery = 'getSeasons: [Season]';

export const addSeason = saveNewSeason;
export const seasonMutation = 'addSeason(name: String): [Season]';

export const addLeague = saveNewLeague;
export const leagueMutation = 'addLeague(seasonId: String, name: String): [Season]';

export default schema;
