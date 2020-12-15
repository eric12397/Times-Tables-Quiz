const router = require('express').Router();
let User = require('../models/User');

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json('Error: ' + error))
})

module.exports = router