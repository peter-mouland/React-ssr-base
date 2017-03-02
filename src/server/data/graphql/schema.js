const { GraphQLSchema } = require('graphql/type');

import GameQuery from './game';

let schema = new GraphQLSchema({
  query: GameQuery
});

module.exports = schema;
