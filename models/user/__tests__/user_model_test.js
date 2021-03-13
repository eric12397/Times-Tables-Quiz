const mongoose = require('mongoose');
const User = require('../user_model');
const db = require('../../../test_utils/test_db');
const bcrypt = require('bcrypt');

// seed data
const mockUser1 = {
  username: 'Mike',
  password: 'IAmMike'
}

let mockUser1Id;

const mockUser2 = {
  username: 'Brad',
  password: 'IAmBrad'
}

let mockUser2Id;

const createUsers = async () => {
  const createdUser1 = await User.create(mockUser1)
  mockUser1Id = createdUser1._id;

  const createdUser2 = await User.create(mockUser2)
  mockUser2Id = createdUser2._id;
};


describe('Testing User Model', () => {

  beforeAll(async () => await db.connect());

  beforeEach(async () => await createUsers());

  afterEach(async () => await db.clearData());

  afterAll(async () => await db.disconnect())


  it('should fetch a specific user', async () => {
    const foundUser = await User.findById(mockUser1Id);

    expect(foundUser._id).toStrictEqual(mockUser1Id);
    expect(foundUser.username).toBe(mockUser1.username);
  })


  it('should fail to fetch an invalid user and return null', async () => {
    const invalidUserId = mongoose.Types.ObjectId();

    await expect(User.findById(invalidUserId))
          .resolves
          .toBeNull()
  })


  it('should fetch all users', async () => {
    const allUsers = await User.find();

    expect(allUsers).toHaveLength(2);

    expect(allUsers).toEqual(
      expect.arrayContaining([
        expect.objectContaining(mockUser1),
        expect.objectContaining(mockUser2)
      ])
    );

  })


  it('should create and save a new user', async () => {
    const newUser = { username: 'Gabby', password: 'IAmGabby' };
    const savedUser = await User.create(newUser);

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(newUser.username);
  
    // default values should be 0
    expect(savedUser.totalStats.score).toBe(0);
    expect(savedUser.totalStats.questions).toBe(0);
    expect(savedUser.totalStats.gamesPlayed).toBe(0);
    expect(savedUser.totalStats.timePlayed).toBe(0);
    expect(savedUser.personalRecordStats.highScore).toBe(0);
    expect(savedUser.personalRecordStats.questions).toBe(0);

    // confirm that new user collection was added to existing seed data
    const allUsers = await User.find();
    expect(allUsers).toHaveLength(3)
  });


  it('should fail to create a new user without a required field', async () => {
    const userMissingPassword = { username: "Aisha" };
    const userMissingName = { password: "IAmAisha" };

    await expect(User.create(userMissingPassword))
          .rejects
          .toThrow(mongoose.Error.ValidationError)

    await expect(User.create(userMissingName))
          .rejects
          .toThrow(mongoose.Error.ValidationError)
  })


  it('should fail to create a user with the same credentials', async () => {
    await expect(User.create(mockUser1))
          .rejects
          .toThrow(mongoose.Error.MongoError) // unique constraints are Mongo errors
  })


  it('should update a specific user', async () => {
    const newUsername = "Zeke";
    
    // new total stats
    const score = 2000;
    const questions = 15;
    const timePlayed = 12000;

    // new personal record stats
    const highScore = 5000;
    const highQuestions = 10;

    const filter = { username: mockUser1.username };
    const update = {
      $inc: { 
        "totalStats.score": score,
        "totalStats.questions": questions,
        "totalStats.gamesPlayed": 1,
        "totalStats.timePlayed": timePlayed,
      },
      $set: {
        "username": newUsername,
        "personalRecordStats.highScore": highScore,
        "personalRecordStats.questions": highQuestions
      }
    };
    const opts = { new: true };

    const updatedUser = await User.findOneAndUpdate(filter, update, opts);

    expect(updatedUser.username).toBe(newUsername);
    expect(updatedUser.totalStats.score).toBe(score);
    expect(updatedUser.totalStats.questions).toBe(questions);
    expect(updatedUser.totalStats.gamesPlayed).toBe(1);
    expect(updatedUser.totalStats.timePlayed).toBe(timePlayed);
    expect(updatedUser.personalRecordStats.highScore).toBe(highScore);
    expect(updatedUser.personalRecordStats.questions).toBe(highQuestions);
  })


  it('should delete a specific user', async () => {
    await User.findByIdAndDelete(mockUser1Id);

    const allUsers = await User.find();

    expect(allUsers).toHaveLength(1);

    expect(allUsers).toEqual(
      expect.arrayContaining([
        expect.not.objectContaining(mockUser1),
        expect.objectContaining(mockUser2)
      ])
    );
  })

});

  
