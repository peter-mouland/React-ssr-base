const mongoose = require('mongoose');

const LeagueSchema = new mongoose.Schema({
  league: {
    type: String,
    index: { unique: true }
  },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Season'
  },
});


module.exports = mongoose.model('League', LeagueSchema);
