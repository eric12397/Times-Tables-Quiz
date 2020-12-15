const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const users = require('./routes/users');
const stats = require('./routes/stats');
const auth = require('./routes/auth');

const { MONGO_URI } = config;

const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

// routes 
app.use('/api/users', users);
app.use('/api/stats', stats);
app.use('/api/auth', auth);


// connect to database
mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('MongoDB connection established successfully'))
  .catch(error => console.log(error))

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})