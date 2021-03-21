const router = require('express').Router();
const config = require('../config');
const authMiddleware = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const UserService = require('../services');

const { JWT_SECRET } = config;

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const savedUser = await UserService.createUser(username, password)
    
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: 3600 });

    res.status(201).json({
      token, 
      user: savedUser
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserService.loginUser(username, password);

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error('Failed to generate JWT');

    res.status(200).json({
      token,
      user
    });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await UserService.fetchUser(req.user.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router