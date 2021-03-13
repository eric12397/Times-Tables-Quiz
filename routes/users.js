const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const UserService = require('../services');

router.get('/', async (req, res) => {
  try {
    const users = await UserService.fetchAllUsers();
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/:id/stats', authMiddleware, async (req, res) => {
  const { id } = req.params
  const gameResults = req.body;

  try {
    const user = await UserService.fetchUser(id);
    await UserService.updateUserStats(user, gameResults)
    res.status(200).json({ msg: "User's stats updated" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router