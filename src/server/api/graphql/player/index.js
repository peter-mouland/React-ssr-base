/* eslint-disable no-underscore-dangle */
import debug from 'debug';

const log = debug('base:graphql/players');

const PlayersDb = require('mongoose').model('Players');

const fetchPlayers = () => new Promise((resolve, reject) => {
  PlayersDb.find({}, (err, players) => {
    if (err || !players) {
      reject(err || { message: 'no player found' });
    } else {
      resolve(players);
    }
  });
});

const fetchPlayer = (playerDetails) => new Promise((resolve, reject) => {
  PlayersDb.findOne(playerDetails, (err, user) => {
    if (err || !user) {
      reject(err || { message: 'no player found' });
    } else {
      resolve(user);
    }
  });
});

const schema = (`
  type Stat {
    apps: Int
    subs: Int
    gls: Int
    assists: Int
    mom: Int
    cs: Int
    con: Int
    penSvd: Int
    yellows: Int
    reds: Int
  }
  type Point {
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
  type Player {
    _id: String!
    player: String!
    code: Int
    pos: String
    club: String
    new: String
    stats: Stat
    points: Point
  }
`);

export default schema;

export const playerQuery = `
  getPlayers(player: String): [Player]
`;


export class Player {
  constructor(player) {
    this._player = player;
    this.player = player.player;
    this.code = player.code;
    this.pos = player.pos;
    this.club = player.club;
  }

  get points() {
    return {
      change: this._player.change,
      gw35: this._player.gw35,
      gw34: this._player.gw34,
      gw33: this._player.gw33,
      gw32: this._player.gw32,
      gw31: this._player.gw31,
      gw30: this._player.gw30,
      gw29: this._player.gw29,
      gw28: this._player.gw28,
      gw27: this._player.gw27,
      gw26: this._player.gw26,
      gw25: this._player.gw25,
      gw24: this._player.gw24,
      gw23: this._player.gw23,
      gw22: this._player.gw22,
      gw21: this._player.gw21,
      gw20: this._player.gw20,
      gw19: this._player.gw19,
      gw18: this._player.gw18,
      gw17: this._player.gw17,
      gw16: this._player.gw16,
      gw15: this._player.gw15,
      gw14: this._player.gw14,
      gw13: this._player.gw13,
      gw12: this._player.gw12,
      gw11: this._player.gw11,
      gw10: this._player.gw10,
      gw9: this._player.gw9,
      gw8: this._player.gw8,
      gw7: this._player.gw7,
      gw6: this._player.gw6,
      gw5: this._player.gw5,
      gw4: this._player.gw4,
      gw3: this._player.gw3,
      gw2: this._player.gw2,
      gw1: this._player.gw1,
      gw0: this._player.gw0
    };
  }

  get stats() {
    return {
      apps: this._player.apps,
      subs: this._player.subs,
      goals: this._player.gls,
      assists: this._player.asts,
      mom: this._player.mom,
      cs: this._player.cs,
      con: this._player.con,
      penSvd: this._player.pensv,
      yellows: this._player.ycard,
      reds: this._player.rcard,
    };
  }
}


export function getPlayers({ player }) {
  const promise = player ? fetchPlayer({ player }) : fetchPlayers();
  return promise.then((players) => players.map((pl) => new Player(pl)));
}
