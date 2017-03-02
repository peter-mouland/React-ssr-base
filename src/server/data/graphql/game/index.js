import { randomRange } from '../../../../app/utils';
import { swapiData } from '../../3rd-party/swapi';
import getQandA from './get-question-and-answers'

const {
  buildSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql/type');


const gameCardType = new GraphQLObjectType({
  name: 'gameCardType',
  fields: {
    "birth_year": { type: GraphQLString },
    "created" : { type: GraphQLString }, // date
    "edited" : { type: GraphQLString }, // date
    "eye_color" : { type: GraphQLString },
    "films" : { type: new GraphQLList(GraphQLString) }, // of string urls
    "gender" : { type: GraphQLString },
    "hair_color" : { type: GraphQLString },
    "height": { type: GraphQLString }, //int
    "homeworld": { type: GraphQLString }, //url
    "mass": { type: GraphQLString }, //int
    "name": { type: GraphQLString },
    "skin_color" : { type: GraphQLString },
    "species": { type: new GraphQLList(GraphQLString) }, // of string urls
    "starships": { type: new GraphQLList(GraphQLString) }, // of strings
    "url": { type: GraphQLString }, //url
    "vehicles" : { type: new GraphQLList(GraphQLString) }, // of string urls
  }
});

const questionAndAnswerType = new GraphQLObjectType({
  name: 'questionAndAnswerType',
  fields: {
    question: {
      type: GraphQLString,
      resolve: function(game, args) {
        console.log('game')
        console.log(game)
        console.log('args')
        console.log(Object.keys(args))
        console.log(args)
        return getQandA(args.data.game.cards);
      }
    },
    answer: {
      type: GraphQLString
    },
    answerCard: {
      type: gameCardType,
    }
  }
});

const GameType = new GraphQLObjectType({
  name: 'GameType',
  fields: {
    card1Details: {
      type:  gameCardType,
      resolve: function(game) {
        console.log('game')
        console.log(game)
        return swapiData(game.api, game.card1)
      }
    },
    card2Details: {
      type:  gameCardType,
      resolve: function(game) {
        return swapiData(game.api, game.card2)
      }
    }
  }
});

const GameQuery = new GraphQLObjectType({
  name: 'GameQuery',
  fields: {
    answerCardIndex : {
      type: GraphQLInt,
      resolve: function() {
        return randomRange(0, 1, 1)[0]
      }
    },
    factIndex : {
      type: GraphQLInt,
      resolve: function(){
        return randomRange(0, 7, 1)[0];
      }
    },
    game: {
      type: GameType,
      args: {
        api: { type: GraphQLString },
        card1: { type: GraphQLInt },
        card2: { type: GraphQLInt },
      },
      resolve: function(game, args) {
        console.log('resolve');
        console.log(game);
        console.log(args);
        return Object.assign({}, game || {}, args)
      }
    }
  }
});
//
// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Game {
//     answerCardIndex: Int!
//     factIndex: Int!
//     roll(numRolls: Int!): [Int]
//   }
//
//   type Query {
//     getGame(gameType: String, card1: Int, card2: Int): RandomDie
//   }
// `);
//
// // This class implements the RandomDie GraphQL type
// class RandomDie {
//   constructor(numSides) {
//     this.numSides = numSides;
//   }
//
//   factIndex() {
//     return randomRange(0, 1, 1)[0];
//   }
//
//   answerCardIndex() {
//     return randomRange(0, 7, 1)[0];
//   }
//
//   roll({numRolls}) {
//     var output = [];
//     for (var i = 0; i < numRolls; i++) {
//       output.push(this.rollOnce());
//     }
//     return output;
//   }
// }
//
// // The root provides the top-level API endpoints
// var root = {
//   getDie: function ({numSides}) {
//     return new RandomDie(numSides || 6);
//   }
// }


export default GameQuery;


