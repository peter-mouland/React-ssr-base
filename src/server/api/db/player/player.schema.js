const mongoose = require('mongoose');

const stats = {
  apps: Number,
  subs: Number,
  gls: Number,
  asts: Number,
  mom: Number,
  cs: Number,
  con: Number,
  pensv: Number,
  ycard: Number,
  rcard: Number,
};

const details = {
  pos: String,
  club: String,
  isNew: Boolean,
  gameWeekStats: stats
};

const mongooseSchema = {
  name: {
    type: String,
    index: { unique: true }
  },
  details,
  totalStats: stats,
};


module.exports = mongoose.model('Players', new mongoose.Schema(mongooseSchema));
module.exports.details = details;
