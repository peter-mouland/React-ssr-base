const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  player: {
    type: String,
    index: { unique: true }
  },
  code: String,
  pos: String,
  club: String,
});


module.exports = mongoose.model('Players', PlayerSchema);
