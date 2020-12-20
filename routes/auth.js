const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

const { JWT_SECRET } = config;

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) throw Error('Username already exists');

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Salt generation error');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Password hashing error');

    const newUser = new User({
      username,
      password: hash
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('User save error');

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: 3600 });

    res.status(200).json({
      token, 
      user: {
        id: savedUser._id,
        username: savedUser.username,
      }
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) throw Error('Please enter your username and password');

    const user = await User.findOne({ username });
    if (!user) throw Error('User does not exist');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error('Failed to generate JWT');

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router