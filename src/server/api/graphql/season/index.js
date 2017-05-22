import debug from 'debug';

const log = debug('base:graphql/seasons');

const Seasons = require('mongoose').model('Season');

const schema = (`
  type League {
    _id: String
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

const getSeason = (id) => new Promise((resolve, reject) => {
  Seasons.findById(id, (err, seasons) => {
    if (err || !seasons) {
      reject(err || { message: 'season not found' });
    } else {
      resolve(seasons);
    }
  });
});

export const getSeasons = (search = {}) => new Promise((resolve, reject) => {
  Seasons.find(search, (err, seasons) => {
    if (err || !seasons) {
      reject(err || { message: 'no season found' });
    } else {
      resolve(seasons);
    }
  });
});

export const updateSeason = (id, seasonUpdate) => new Promise((resolve, reject) => {
  Seasons.findByIdAndUpdate(id, seasonUpdate, { new: true }, (err, season) => {
    if (err) { return reject(err); }
    return resolve(season);
  });
});

export const addSeason = ({ name }) => {
  const promise = new Promise((resolve, reject) => {
    const newSeason = new Seasons({ name });
    newSeason.save((err) => {
      if (err) { return reject(err); }
      return resolve({ name });
    });
  });
  return promise.then(() => getSeasons());
};

export const addLeague = ({ seasonId, name }) => getSeason(seasonId)
  .then((season) => {
    season.leagues.push({ name });
    return new Promise((resolve, reject) => {
      season.save((err, updatedSeason) => {
        if (err) return reject(err);
        return resolve(updatedSeason);
      });
    });
  })
  .then(() => getSeasons());

export const seasonQuery = `
  getSeasons: [Season]
`;

export const seasonMutation = `
  addSeason(name: String): [Season]
`;

export const leagueMutation = `
  addLeague(seasonId: String, name: String): [Season]
`;

export default schema;
