const app = require('../../app');
const request = require("supertest");
const db = require('../../test_utils/test_db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user/user_model');

let server;

const createSeedData = async () => {
  const password = "IAmGordi";
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const seedData = {
    username: "Gordi",
    password: hash
  }

  const createdUser = await User.create(seedData);
};


describe('Testing routes', () => {

  beforeAll(async () => {
    await db.connect();
    server = app.listen(3001);
  });

  beforeEach(async () => await createSeedData());

  afterEach(async () => await db.clearData());

  afterAll(async (done) => {
    await db.disconnect();
    server.close(done)
  });


  it ('has a module', () => {
    expect(app).toBeDefined();
  })


  it ("should GET all users", async () => {
    await request(server)
      .get('/api/users')
      .expect(200)
      .then(response => {
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("username");
        expect(response.body[0]).not.toHaveProperty("password");
      })
  })

})


