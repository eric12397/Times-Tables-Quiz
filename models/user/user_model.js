const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true
    },
    
    totalStats: {
      score: { type: Number, default: 0 },
      questions: { type: Number, default: 0 },
      gamesPlayed: { type: Number, default: 0 },
      timePlayed: { type: Number, default: 0 },
    },

    personalRecordStats: {
      highScore: { type: Number, default: 0 },
      questions: { type: Number, default: 0 },
    }    
  },
  { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;