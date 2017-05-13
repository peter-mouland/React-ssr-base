import debug from 'debug';

const log = debug('base:graphql/players');

const Players = require('mongoose').model('Players');

const fetchPlayers = () => new Promise((resolve, reject) => {
  Players.find({}, (err, players) => {
    if (err || !players) {
      reject(err || { message: 'no player found' });
    } else {
      resolve(players);
    }
  });
});
const fetchPlayer = (playerDetails) => new Promise((resolve, reject) => {
  Players.findOne(playerDetails, (err, user) => {
    if (err || !user) {
      reject(err || { message: 'no player found' });
    } else {
      resolve(user);
    }
  });
});

const schema = (`
  type Player {
    _id: String!
    player: String!
    code: String
    pos: String
    club: String
  }
`);

export default schema;

export const playerQuery = `
  getPlayers(player: String): [Player]
`;

export function getPlayers({ player }) {
  return player ? fetchPlayer({ player }) : fetchPlayers();
}
