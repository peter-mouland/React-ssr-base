const User = require('mongoose').model('User');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql/type');


const fetchUserData = (user) => new Promise((resolve, reject) => {
  User.find(user, (err, user) => {
    if (err || !user) {
      reject(err);
    } else {
      resolve(user);
    }
  });
});


const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: {
      type: GraphQLInt
    },
    email:{
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
  }
});


const UserQuery = new GraphQLObjectType({
  name: 'UserQuery',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        email: { type: GraphQLString }
      },
      resolve: function(user, args) {
        return fetchUserData({ id: args.id, email: args.email });
      }
    }
  }
});

module.exports = UserQuery;
