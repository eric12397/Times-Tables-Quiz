const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');

const users = require('./routes/users');
const auth = require('./routes/auth');

const { MONGO_URI } = config;

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes 
app.use('/api/users', users);
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

// production
if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})