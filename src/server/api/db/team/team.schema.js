const mongoose = require('mongoose');

const PlayerType = {
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  name: String,
  club: String,
  gwPoints: Number,
  totalPoints: Number
};

const TeamSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String
  },
  season: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Season'
    },
    name: String
  },
  league: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: String
  },
  name: String,
  gw: {
    points: Number,
    transfersRequested: Number,
    transfersMade: Number
  },
  total: {
    points: Number,
    transfersRequested: Number,
    transfersMade: Number
  },
  gk: PlayerType,
  cb1: PlayerType,
  cb2: PlayerType,
  fb1: PlayerType,
  fb2: PlayerType,
  cm1: PlayerType,
  cm2: PlayerType,
  wm1: PlayerType,
  wm2: PlayerType,
  fwd1: PlayerType,
  fwd2: PlayerType,
  sub: PlayerType,
});


module.exports = mongoose.model('Teams', TeamSchema);
