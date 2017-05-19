import debug from 'debug';

const log = debug('base:graphql/seasons');

const Seasons = require('mongoose').model('Season');

const fetchSeasons = () => new Promise((resolve, reject) => {
  Seasons.find({}, (err, seasons) => {
    if (err || !seasons) {
      reject(err || { message: 'no season found' });
    } else {
      resolve(seasons);
    }
  });
});

const schema = (`
  type Season {
    _id: String!
    season: String
    isLive: Boolean
    currentGW: Int
  }
`);

export const seasonQuery = `
  getSeasons: [Season]
`;

export function getSeasons() {
  return fetchSeasons();
}

export default schema;
