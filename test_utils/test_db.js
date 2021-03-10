const mongoose = require('mongoose');
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();


// connects to in-memory test db instead of using actual db
module.exports.connect = async () => {
  const uri = await mongod.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  })
}


module.exports.clearData = async () => {
  const { collections } = mongoose.connection;

  for (let key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}


module.exports.disconnect = async () => {
  await mongoose.connection.dropDatabase();

  await mongoose.connection.close();

  await mongod.stop();
}