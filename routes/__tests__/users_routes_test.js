const app = require('../../app');
const request = require("supertest");
const db = require('../../test_utils/test_db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user/user_model');

let server;

const getToken = async () => {
  const response = await request(server)
    .post('/api/auth/login')
    .send({ username: 'Gordi', password: 'IAmGordi' })
  
  console.log(response.body)  
  let token = response.body.token;

  return token;
}

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


  it ("should get all users", async () => {
    const response = await request(server)
      .get('/api/users')
      .expect(200)
      
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("username");
    expect(response.body[0]).not.toHaveProperty("password");
      
  })


  it ("should register a new user and get back a valid token", async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({ username: "Shaq", password: "IAmShaq" })
      .expect(201)

    const createdUser = response.body.user;
    const token = response.body.token;
      
    expect(token).toBeDefined();
    expect(createdUser.id).toBeDefined();
    expect(createdUser.username).toBe("Shaq");
  })


  it ("should fail to register an existing user", async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({ username: "Gordi", password: "IAmGordi" })
      .expect(400)
  })


  it ("should login successfully and get back a valid token", async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Gordi', password: 'IAmGordi' })
      .expect(200);
  
    let token = response.body.token;
    expect(token).toBeDefined();
  })


  it ("should fail to login with wrong credentials", async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Gordi', password: 'wrong password' })
      .expect(400);
  })


  it ("should fail to login a user who is not registered yet", async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({ username: 'NotGordi', password: 'IAmNotGordi' })
      .expect(400);
  })


  it ("should get a protected user with auth", async () => {
    const token = getToken();
    const user = User.findOne({ username: 'Gordi' });

    const response = await request(server)
      .get('/api/auth/login')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect(200);

    console.log(response)
    const { id, username } = response.body

    expect(user._id).toEqual(id);
    expect(user.username).toEqual(username);
  })


  it ("should fail to get a protected user without auth", async () => {
    await request(server)
      .get('/api/auth/user')
      .expect(401)
  })
})


