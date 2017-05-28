import debug from 'debug';

const log = debug('base:db/season.actions');

const Seasons = require('mongoose').model('Season');

export const findSeasonById = (id) => Seasons.findById(id).exec();

export const findSeasons = (search = {}) => Seasons.find(search).exec();

export const saveNewSeason = ({ name }) => {
  const newSeason = new Seasons({ name });
  return newSeason.save();
};

export const updateSeasonById = (id, seasonUpdate) => Seasons.findByIdAndUpdate(id, seasonUpdate, { new: true }).exec();

export const saveNewLeague = ({ seasonId, name }) => (
  updateSeasonById(seasonId, { $push: { leagues: { name } } })
    .then((season) => season.leagues.find((league) => league.name === name))
);

