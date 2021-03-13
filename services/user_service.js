const fetchAllUsers = User => () => {
  return User.find().select('-password');
}

const fetchUser = User => id => {
  return User.findById(id);
}

const updateUserStats = User => (user, gameResults) => {
  let highScore = 
    user.personalRecordStats.highScore > gameResults.highScore ?
    user.personalRecordStats.highScore : gameResults.highScore;

  let questions =
    user.personalRecordStats.questions > gameResults.highQuestions ?
    user.personalRecordStats.questions : gameResults.highQuestions;

  return User.updateOne(
    { _id: user._id },
    { 
      $inc: { 
        "totalStats.score": gameResults.currentScore,
        "totalStats.questions": gameResults.questionsAnswered,
        "totalStats.gamesPlayed": 1,
        "totalStats.timePlayed": gameResults.totalTime,
      },
      $set: {
        "personalRecordStats.highScore": highScore,
        "personalRecordStats.questions": questions
      },
    }
  )
}


module.exports = User => {
  return {
    fetchAllUsers: fetchAllUsers(User),
    fetchUser: fetchUser(User),
    updateUserStats: updateUserStats(User),
  }
}