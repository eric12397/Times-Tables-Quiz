const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/:id/stats', authMiddleware, async (req, res) => {
  const { 
    currentScore,
    questionsAnswered,
    totalTime,
    highScore,
    highQuestions
  } = req.body;

  const { id } = req.params

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { 
        $inc: { 
          "totalStats.score": currentScore,
          "totalStats.questions": questionsAnswered,
          "totalStats.gamesPlayed": 1,
          "totalStats.timePlayed": totalTime,
        },
        $set: {
          "personalRecordStats.highScore": highScore,
          "personalRecordStats.questions": highQuestions
        },
      },
      { new: true }
    )

    res.status(200).json({ 
      updatedUser, 
      msg: "User's stats updated" 
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router