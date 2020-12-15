const router = require('express').Router();
const GameStats = require('../models/GameStats');

router.get('/', async (req, res) => {
  try {
    const stats = await GameStats.find();
    if (!stats) throw Error('Failed to fetch stats');

    res.status(200).json(stats)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router