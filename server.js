const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');
const app = require('./app');

const port = process.env.PORT || 5000;
const { MONGO_URI } = config;

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