const express = require('express');
const cors = require('cors');

const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes 
app.use('/api/users', users);
app.use('/api/auth', auth);

module.exports = app;