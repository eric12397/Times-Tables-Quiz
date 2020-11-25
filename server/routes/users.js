const router = require('express').Router();
let User = require('../models/users.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.route('/').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser.save()
    .then(() => res.json('User Added!'))
    .catch(error => res.status(400).json('Error: ' + error))
})

module.exports = router