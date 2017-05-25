import debug from 'debug';

const log = debug('base:graphql/seasons');

const Seasons = require('mongoose').model('Season');

export const findSeasonById = (id) => new Promise((resolve, reject) => {
  Seasons.findById(id, (err, season) => {
    if (err || !season) {
      reject(err || { message: 'season not found' });
    } else {
      resolve(season);
    }
  });
});

export const findSeasons = (search = {}) => new Promise((resolve, reject) => {
  Seasons.find(search, (err, seasons) => {
    if (err || !seasons) {
      reject(err || { message: 'no season found' });
    } else {
      resolve(seasons);
    }
  });
});

export const saveNewSeason = ({ name }) => {
  const promise = new Promise((resolve, reject) => {
    const newSeason = new Seasons({ name });
    newSeason.save((err, season) => {
      if (err) { return reject(err); }
      return resolve(season);
    });
  });
  return promise.then(() => findSeasons());
};

export const updateSeasonById = (id, seasonUpdate) => new Promise((resolve, reject) => {
  Seasons.findByIdAndUpdate(id, seasonUpdate, { new: true }, (err, season) => {
    if (err) { return reject(err); }
    return resolve(season);
  });
});

export const saveNewLeague = ({ seasonId, name }) => (
  updateSeasonById(seasonId, { $push: { leagues: { name } } }).then(() => findSeasons())
);

