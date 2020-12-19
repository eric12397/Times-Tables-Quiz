const jwt = require('jsonwebtoken');
const config = require('../config');

const { JWT_SECRET } = config;

function auth(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Authorization failed, unable to detect JWT' });

  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET);
    req.user = verifiedToken;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = auth;