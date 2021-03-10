const mongoose = require('mongoose');
const User = require('../user_model');
const db = require('../../../test_utils/test_db');
const bcrypt = require('bcrypt');

const mockUserData = {
  username: 'Eel',
  password: 'IAmEel'
}

describe('Testing User Model', () => {

  beforeAll(async () => await db.connect());

  afterEach(async () => await db.clearData());

  afterAll(async () => await db.disconnect())


  it('should create and save a new user', async () => {

    const mockUser = new User({
      username: mockUserData.username,
      password: mockUserData.password,
    });
    const savedUser = await mockUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(mockUserData.username);
    expect(savedUser.password).toBe(mockUserData.password);
    
    expect(savedUser.totalStats.score).toBe(0);
    expect(savedUser.totalStats.questions).toBe(0);
    expect(savedUser.totalStats.gamesPlayed).toBe(0);
    expect(savedUser.totalStats.timePlayed).toBe(0);
    expect(savedUser.personalRecordStats.highScore).toBe(0);
    expect(savedUser.personalRecordStats.questions).toBe(0);
  });

});

  
