const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const fetchAllUsers = User => () => {
  return User.find().select('-password');
}

const fetchUser = User => id => {
  return User.findById(id).select('-password')
}

const createUser = User => async (username, password) => {
  const salt = await bcrypt.genSalt(10);
  if (!salt) throw Error('Salt generation error');

  const hash = await bcrypt.hash(password, salt);
  if (!hash) throw Error('Password hashing error');

  const newUser = new User({
    username,
    password: hash
  });

  return newUser.save();
}

const loginUser = User => async (username, password) => {
  if (!username || !password) 
    throw Error('Please enter your username and password');

  const user = await User.findOne({ username });
  if (!user) throw Error('User does not exist');

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw Error('Invalid credentials');


  return user
}

const updateUserStats = User => async (id, gameResults) => {
  const user = await User.findById(id);

  let highScore = 
    user.personalRecordStats.highScore > gameResults.highScore ?
    user.personalRecordStats.highScore : gameResults.highScore;

  let highQuestions =
    user.personalRecordStats.questions > gameResults.highQuestions ?
    user.personalRecordStats.questions : gameResults.highQuestions;

  const filter = { _id: id };
  const update = {
    $inc: { 
      "totalStats.score": gameResults.currentScore,
      "totalStats.questions": gameResults.questionsAnswered,
      "totalStats.gamesPlayed": 1,
      "totalStats.timePlayed": gameResults.totalTime,
    },
    $set: {
      "personalRecordStats.highScore": highScore,
      "personalRecordStats.questions": highQuestions
    }
  }

  return User.updateOne(filter, update);
}

module.exports = User => {
  return {
    fetchAllUsers: fetchAllUsers(User),
    fetchUser: fetchUser(User),
    createUser: createUser(User),
    loginUser: loginUser(User),
    updateUserStats: updateUserStats(User)
  }
}