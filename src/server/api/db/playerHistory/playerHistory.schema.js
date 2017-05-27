const mongoose = require('mongoose');
const { mongooseSchema } = require('../player/player.schema');

const PlayerHistorySchema = new mongoose.Schema({
  name: String,
  player: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    },
    gw: [mongooseSchema],
  }
});

module.exports = mongoose.model('PlayerHistory', PlayerHistorySchema);
