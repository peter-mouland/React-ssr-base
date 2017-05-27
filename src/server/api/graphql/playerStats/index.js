/* eslint-disable no-underscore-dangle */
import debug from 'debug';

import { findPlayers, findPlayer } from '../../db/player/player.actions';

const log = debug('base:graphql/players');

const schema = (`
  type Stats {
    apps: Int
    subs: Int
    gls: Int
    asts: Int
    mom: Int
    cs: Int
    con: Int
    pensv: Int
    ycard: Int
    rcard: Int
  }
  type Points {
    apps: Int
    subs: Int
    gls: Int
    asts: Int
    mom: Int
    cs: Int
    con: Int
    pensv: Int
    ycard: Int
    rcard: Int
    total: Int
  }
  type GameWeek {
    stats: Stats
    points: Points
  }
  type Player {
    _id: String!
    name: String!
    code: Int
    pos: String
    club: String
    new: String
    gameWeek: GameWeek
    total: GameWeek
    pointsChange: Int
  }
`);

export default schema;

export const playerQuery = `
  getPlayers(player: String): [Player]
`;

export function getPlayers({ player }) {
  return player ? findPlayer({ player }) : findPlayers();
}
