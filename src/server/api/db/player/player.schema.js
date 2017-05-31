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

const points = {
  ...stats,
  total: Number
};

const mongooseSchema = {
  name: {
    type: String,
    index: { unique: true }
  },
  code: Number,
  pos: String,
  club: String,
  new: Boolean,
  gameWeek: {
    stats,
    points
  },
  total: {
    stats,
    points
  },
  pointsChange: Number
};


module.exports = mongoose.model('Players', new mongoose.Schema(mongooseSchema));
module.exports.mongooseSchema = mongooseSchema;
