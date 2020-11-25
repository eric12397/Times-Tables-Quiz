const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const users = require('./routes/users');

const app = express();
const port = process.env.PORT || 5000;

// allows environment variables to be stored in dotenv file
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());

// routes 
app.get('/', (req, res) => {
  res.send('HELLO WORLD');
})

// connects to database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection established successfully");
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})