// https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-parent-references/
const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: Date.now },
  name: {
    type: String,
    index: {
      unique: true,
      required: true
    }
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
    name: {
      type: String,
      index: { unique: true }
    },
    tier: {
      type: Number,
      default: 1
    }
  }]
});


module.exports = mongoose.model('Season', SeasonSchema);
