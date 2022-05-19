const loginUser = require("./userControllers");

jest.mock("../../db/models/User", () => ({
  ...jest.requireActual("../../db/models/User"),
  findOne: (username) => username,
}));

jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  compare: jest.fn().mockReturnValue("testComparedPassword"),
}));

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: jest.fn().mockReturnValue("testToken"),
}));

describe("Given the loginUser function", () => {
  describe("When it's called and receives a request with 'name' and 'password'", () => {
    test("Then it should call the response with status 200 and json with 'testToken'", async () => {
      const req = { body: { username: "name", password: "password" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedStatus = 200;
      const expectedToken = { token: "testToken" };

      await loginUser(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedToken);
    });
  });
});
