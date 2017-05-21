const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema({
  name: {
    type: String,
    index: { unique: true }
  },
  isLive: {
    type: Boolean,
    default: false
  },
  currentGW: {
    type: Number,
    default: 0
  },
  leagues: [{
    tier: Number,
    name: String,
    managers: [{
      team_id: String
    }]
  }]
});


module.exports = mongoose.model('Season', SeasonSchema);
