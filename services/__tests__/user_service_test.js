const UserService = require('../user_service');
const sinon = require('sinon')

describe("Testing UserService", () => {
  it("has a module", () => {
    expect(UserService).toBeDefined();
  })

  it("should fetch a user", () => {
    const MockModel = {
      findById: () => {}
    }

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

  it("should create a user", async () => {
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

});
