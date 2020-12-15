const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statsSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    highScore: Number,
    questionsAnswered: Number,
    times: Array,
  }
)

const GameStats = mongoose.model('Stats', statsSchema);

module.exports = GameStats;