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
  const { id } = req.params

  try {
    const user = await User.findById(id);

    let highScore = 
      user.personalRecordStats.highScore > req.body.highScore ?
      user.personalRecordStats.highScore : req.body.highScore;

    let questions =
      user.personalRecordStats.questions > req.body.highQuestions ?
      user.personalRecordStats.questions : req.body.highQuestions;
      
    console.log('high score', highScore);
    console.log('questions', questions);

    await User.updateOne(
      { _id: id },
      { 
        $inc: { 
          "totalStats.score": req.body.currentScore,
          "totalStats.questions": req.body.questionsAnswered,
          "totalStats.gamesPlayed": 1,
          "totalStats.timePlayed": req.body.totalTime,
        },
        $set: {
          "personalRecordStats.highScore": highScore,
          "personalRecordStats.questions": questions
        },
      }
    )

    res.status(200).json({ msg: "User's stats updated" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router