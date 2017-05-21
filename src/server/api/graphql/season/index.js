import debug from 'debug';

const log = debug('base:graphql/seasons');

const Seasons = require('mongoose').model('Season');

const schema = (`
  type League {
    _id: String!
    name: String
    tier: Int
  }
  type Season {
    _id: String!
    name: String
    isLive: Boolean
    currentGW: Int
    leagues: [League]
  }
`);

const fetchSeasons = () => new Promise((resolve, reject) => {
  Seasons.find({}, (err, seasons) => {
    if (err || !seasons) {
      reject(err || { message: 'no season found' });
    } else {
      resolve(seasons);
    }
  });
});

export const addSeason = (season) => {
  const promise = new Promise((resolve, reject) => {
    const newSeason = new Seasons(season);
    newSeason.save((err) => {
      if (err) { return reject(err); }
      return resolve(season);
    });
  });
  return promise.then(fetchSeasons);
};

export const seasonQuery = `
  getSeasons: [Season]
`;

export const seasonMutation = `
  addSeason(name: String): [Season]
`;

export function getSeasons() {
  return fetchSeasons();
}

export default schema;
