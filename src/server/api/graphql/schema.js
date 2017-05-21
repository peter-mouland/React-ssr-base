import { buildSchema } from 'graphql';

// maybe use babel-plugin-import-glob  in the future
import playersSchema, { getPlayers, playerQuery } from './player';
import seasonsSchema, {
  getSeasons, addSeason, addLeague, seasonQuery, seasonMutation, leagueMutation
} from './season';
import userSchema, { getUser, userQuery } from './user';
import dashboardSchema, { getDashboard, dashboardQuery } from './dashboard';

// The root provides the top-level API endpoints
export const root = {
  getPlayers,
  getSeasons,
  addSeason,
  addLeague,
  getUser,
  getDashboard,
};

export default buildSchema(`
  ${playersSchema}
  ${seasonsSchema}
  ${userSchema}
  ${dashboardSchema}
  
  type Query {
    ${playerQuery}
    ${seasonQuery}
    ${userQuery}
    ${dashboardQuery}
  }
  
  type Mutation {
    ${seasonMutation}
    ${leagueMutation}
  }
`);

