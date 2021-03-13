const User = require('../models/user/user_model');
const UserService = require('./user_service');

module.exports = UserService(User);