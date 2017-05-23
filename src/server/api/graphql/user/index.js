import debug from 'debug';

const log = debug('base:graphql/User');

const User = require('mongoose').model('User');

const fetchUserData = (userDetails) => new Promise((resolve, reject) => {
  User.findOne(userDetails, (err, user) => {
    if (err || !user) {
      reject(err || { message: 'no user found' });
    } else {
      resolve(user);
    }
  });
});

const schema = (`
  type User {
    _id: String!
    email: String!
    name: String
  }
`);

export const userQuery = `
  getUser(email: String, id: String): User
`;

export const getUser = ({ email, id }) => fetchUserData({ _id: id, email });

export default schema;
