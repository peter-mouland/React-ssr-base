import debug from 'debug';

import { findOneUser } from '../../db/user/user.actions';

const log = debug('base:graphql/seasons');

const schema = (`
  type User {
    _id: String!
    email: String!
    name: String
    mustChangePassword: Boolean
  }
`);

export const getUser = ({ email, id }) => findOneUser({ _id: id, email });
export const userQuery = 'getUser(email: String, id: String): User';

export default schema;
