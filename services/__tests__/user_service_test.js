const UserService = require('../user_service');
const sinon = require('sinon');
const bcrypt = require('bcrypt');

describe("Testing UserService", () => {
  it("has a module", () => {
    expect(UserService).toBeDefined();
  })


  it("should fetch a user", () => {
    const MockModel = {
      findById: () => {}
    }

    // imitating chained calls together
    sinon.stub(MockModel, 'findById').callsFake(() => {
      return {
        select: sinon.stub().returns()
      }
    })

    const userService = UserService(MockModel);
    userService.fetchUser(); 
    expect(MockModel.findById.calledOnce).toEqual(true)
  })


  it("should fetch all users", () => {
    const MockModel = {
      find: () => {}
    }

    sinon.stub(MockModel, 'find').callsFake(() => {
      return {
        select: sinon.stub().returns()
      }
    })

    const userService = UserService(MockModel);
    userService.fetchAllUsers();
    expect(MockModel.find.calledOnce).toEqual(true)
  })


  it("should create a user successfully", async () => {
    const save = sinon.spy();

    let username;
    let password;

    const MockModel = function(data) {
      username = data.username;
      password = data.password;

      return {
        ...data,
        save
      };
    };

    const userService = UserService(MockModel);
    await userService.createUser("Gordi", "IAmGordi");

    expect(save.calledOnce).toEqual(true);
    expect(username).toEqual("Gordi");
    expect(password).not.toEqual("IAmGordi"); // hashed password
  })


  it("should fail to save a user when an error is thrown", async () => {
    const save = sinon.spy();

    const MockModel = function(data) {
      return {
        ...data,
        save
      };
    };

    const errorMsg = new Error('some error');

    // simulate error 
    sinon.stub(bcrypt, 'genSalt').throws(errorMsg);

    try {
        const userService = UserService(MockModel);
        await userService.createUser("Gordi", "IAmGordi");
    } catch (err) {
        sinon.assert.threw(bcrypt.genSalt, errorMsg);
        sinon.assert.notCalled(save);
    } 
    
    bcrypt.genSalt.restore();
  })


  it("should login a user successfully", async () => {
    const password = "IAmGordi";
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const mockUser = {
      username: 'Gordi',
      password: hash
    }

    const MockModel = {
      findOne: sinon.stub().returns(mockUser)
    };

    const userService = UserService(MockModel);
    await expect(userService.loginUser('Gordi', 'IAmGordi'))
            .resolves
            .toEqual(mockUser)
  })


  it("should fail to login a user when passwords don't match", async () => {
    const password = "IAmGordi";
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const mockUser = {
      username: 'Gordi',
      password: hash
    }

    const MockModel = {
      findOne: sinon.stub().returns(mockUser)
    };

    const userService = UserService(MockModel);
    await expect(userService.loginUser('Gordi', 'wrong password'))
            .rejects
            .toThrow();
  });


  it("should update a user's stats successfully", async () => {

    const mockUser = {
      _id: 12,
      username: 'Gordi',
      totalStats: {
        "score": 10000,
        "questions": 50,
        "gamesPlayed": 5,
        "timePlayed": 60000
      },
      personalRecordStats: {
        highScore: 5000,
        questions: 25
      }
    };

    const mockResults = {
      currentScore: 300,
      questionsAnswered: 5,
      totalTime: 5000
    };
    
    const MockModel = {
      findById: sinon.stub().withArgs(12).returns(mockUser),
      findOneAndUpdate: sinon.spy()
    };

    const userService = UserService(MockModel);
    await userService.updateUserStats(12, mockResults);

    sinon.assert.calledWith(MockModel.findById, 12);
    expect(MockModel.findOneAndUpdate.calledOnce).toEqual(true);
  })

});
