import { buildSchema } from 'graphql';

// maybe use babel-plugin-import-glob  in the future
import playersSchema, { getPlayers, playerQuery } from './playerStats';
import seasonsSchema, {
  getSeasons, getTeams, addSeason, addLeague, addUser,
  seasonQuery, teamQuery, seasonMutation, leagueMutation, addUserMutation
} from './admin';
import dashboardSchema, { getDashboard, dashboardQuery } from './dashboard';
import userSchema from './user';

// The root provides the top-level API endpoints
export const root = {
  getPlayers,
  getSeasons,
  getTeams,
  addSeason,
  addLeague,
  addUser,
  getDashboard,
};

export default buildSchema(`
  ${userSchema}
  ${playersSchema}
  ${seasonsSchema}
  ${dashboardSchema}
  
  type Query {
    ${playerQuery}
    ${seasonQuery}
    ${teamQuery}
    ${dashboardQuery}
  }
  
  type Mutation {
    ${seasonMutation}
    ${leagueMutation}
    ${addUserMutation}
  }
`);

