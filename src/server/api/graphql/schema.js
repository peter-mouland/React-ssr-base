import { buildSchema } from 'graphql';

// maybe use babel-plugin-import-glob  in the future
import gameSchema, { getGame, gameQuery } from './game';
import userSchema, { getUser, userQuery } from './user';
import dashboardSchema, { getDashboard, dashboardQuery } from './dashboard';

// The root provides the top-level API endpoints
export const root = {
  getGame,
  getUser,
  getDashboard,
};

export default buildSchema(`
  ${gameSchema}
  ${userSchema}
  ${dashboardSchema}
  
  type Query {
    ${gameQuery}
    ${userQuery}
    ${dashboardQuery}
  }
`);

