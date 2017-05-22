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
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    tier: {
      type: Number,
      default: 1
    },
    name: String,
    managers: [{
      team_id: String
    }]
  }]
});


module.exports = mongoose.model('Season', SeasonSchema);
