const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  seasonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Season'
  },
  name: String,
  gw: Number,
  points: Number,
  gk: Number,
  gkPoints: Number,
  cb1: Number,
  cb1Points: Number,
  cb2: Number,
  cb2Points: Number,
  fb1: Number,
  fb1Points: Number,
  fb2: Number,
  fb2Points: Number,
  cm1: Number,
  cm1Points: Number,
  cm2: Number,
  cm2Points: Number,
  wm1: Number,
  wm1Points: Number,
  wm2: Number,
  wm2Points: Number,
  fwd1: Number,
  fwd1Points: Number,
  fwd2: Number,
  fwd2Points: Number,
  sub: Number,
  subPoints: Number,
});


module.exports = mongoose.model('Teams', TeamSchema);
