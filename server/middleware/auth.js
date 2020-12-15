const jwt = require('jsonwebtoken');
const config = require('../config');

const { JWT_TOKEN } = config;

function auth(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'Authorization failed, unable to detect JWT' });

  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET);
    console.log(verifiedToken)
    req.user = verifiedToken;
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Token is not valid' })
  }
}

module.exports = auth;