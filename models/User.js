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
      score: Number,
      questions: Number,
      gamesPlayed: Number,
      timePlayed: Number,
    },

    personalRecordStats: {
      highScore: Number,
      questions: Number,
    }    
  },
  { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;