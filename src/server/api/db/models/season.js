const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema({
  season: {
    type: String,
    index: { unique: true }
  },
  isLive: Boolean,
  currentGW: Number
});


module.exports = mongoose.model('Season', SeasonSchema);
