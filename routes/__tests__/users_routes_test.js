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

  createdUser.totalStats.score = 2000;
  createdUser.totalStats.questions = 15;
  createdUser.totalStats.gamesPlayed = 3;
  createdUser.totalStats.timePlayed = 10000;

  createdUser.personalRecordStats.highScore = 5000;
  createdUser.personalRecordStats.questions = 10;

  await createdUser.save();
};

const getId = async () => {
  const user = await User.findOne({ username: "Gordi" });
  return user._id
}


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
    const token = await getToken();

    const response = await request(server)
      .get('/api/auth/user')
      .set('Authorization', token)
      .expect(200);

    const { id, username } = response.body.user

    expect(id).toBeDefined();
    expect(username).toEqual('Gordi');
  })


  it ("should fail to get a protected user without auth", async () => {
    await request(server)
      .get('/api/auth/user')
      .expect(401)
  })


  it ("should correctly increment totalTime, currentScore, and questionsAnswered, gamesPlayed fields", async () => {
    const token = await getToken();
    const id = await getId();
    
    const response = await request(server)
      .post(`/api/users/${id}/stats`)
      .set('Authorization', token)
      .send({ 
        highScore: 6000,
        highQuestions: 20,
        totalTime: 10000,
        currentScore: 6000,
        questionsAnswered: 12
       })
      .expect(200)

    const { user } = response.body;

    expect(user.totalStats.score).toBe(8000);
    expect(user.totalStats.questions).toBe(27);
    expect(user.totalStats.timePlayed).toBe(20000);
    expect(user.totalStats.gamesPlayed).toBe(4);
  })


  it ("should overwrite previous high scores/questions when new high scores/questions are greater", async () => {
    const token = await getToken();
    const id = await getId();
    
    const response = await request(server)
      .post(`/api/users/${id}/stats`)
      .set('Authorization', token)
      .send({ 
        highScore: 6000,
        highQuestions: 20,
        totalTime: 10000,
        currentScore: 6000,
        questionsAnswered: 12
       })
      .expect(200)

    const { user } = response.body;

    expect(user.personalRecordStats.highScore).toBe(6000);
    expect(user.personalRecordStats.questions).toBe(20);
  })


  it ("should not overwrite previous high scores/questions are when new high scores/questions are lesser", async () => {
    const token = await getToken();
    const id = await getId();
    
    const response = await request(server)
      .post(`/api/users/${id}/stats`)
      .set('Authorization', token)
      .send({ 
        highScore: 100,
        highQuestions: 1,
        totalTime: 10000,
        currentScore: 6000,
        questionsAnswered: 12
       })
      .expect(200)
      
    const { user } = response.body;

    expect(user.personalRecordStats.highScore).toBe(5000);
    expect(user.personalRecordStats.questions).toBe(10);
  })


  it ("should fail to update a user's stats without auth", async () => {
    const id = await getId();

    await request(server)
      .post(`/api/users/${id}/stats`)
      .expect(401)
  })


  it ("returns 404", async () => {
    await request(server)
      .get("/fail")
      .expect(404)
  })

})