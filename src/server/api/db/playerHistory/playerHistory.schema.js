const mongoose = require('mongoose');
const { details } = require('../player/player.schema');

const PlayerHistorySchema = new mongoose.Schema({
  player: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    },
    gw: [details],
  }
});

module.exports = mongoose.model('PlayerHistory', PlayerHistorySchema);
