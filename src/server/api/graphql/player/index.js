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
    code: Int
    pos: String
    club: String
    new: String
    apps: Int
    subs: Int
    gls: Int
    asts: Int
    mom: Int
    cs: Int,
    con: Int
    pensv: Int
    ycard: Int
    rcard: Int
    change: Int
    gw35: Int
    gw34: Int
    gw33: Int
    gw32: Int
    gw31: Int
    gw30: Int
    gw29: Int
    gw28: Int
    gw27: Int
    gw26: Int
    gw25: Int
    gw24: Int
    gw23: Int
    gw22: Int
    gw21: Int
    gw20: Int
    gw19: Int
    gw18: Int
    gw17: Int
    gw16: Int
    gw15: Int
    gw14: Int
    gw13: Int
    gw12: Int
    gw11: Int
    gw10: Int
    gw9: Int
    gw8: Int
    gw7: Int
    gw6: Int
    gw5: Int
    gw4: Int
    gw3: Int
    gw2: Int
    gw1: Int
    gw0: Int
  }
`);

export default schema;

export const playerQuery = `
  getPlayers(player: String): [Player]
`;

export function getPlayers({ player }) {
  return player ? fetchPlayer({ player }) : fetchPlayers();
}
