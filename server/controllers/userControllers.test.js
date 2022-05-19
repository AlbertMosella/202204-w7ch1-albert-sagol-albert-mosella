const loginUser = require("./userControllers");

jest.mock("../../db/models/User", () => ({
  ...jest.requireActual("../../db/models/User"),
  findOne: ({ name }) => name === "correctName",
}));

jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  compare: (password) => password === "correctPassword",
}));

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: () => "testToken",
}));

describe("Given the loginUser function", () => {
  describe("When it's called and receives a request with 'correctName' and 'correctPassword'", () => {
    test("Then it should call the response with status 200 and json with 'testToken'", async () => {
      const req = {
        body: { name: "correctName", password: "correctPassword" },
      };
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

  describe("When it's called and recieves a request with 'wrongName'", () => {
    test("Then it should call the next with error with status 403 and message 'Wrong user data'", async () => {
      const req = { body: { name: "wrongName" } };
      const next = jest.fn();

      const error = new Error("Wrong user data");
      error.statusCode = 403;

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it's called and recieves a request with 'correctName' and 'wrongPassword'", () => {
    test("Then it should call the next with error with status 403 and message 'Wrong user data'", async () => {
      const req = {
        body: { name: "correctName", password: "wrongPassword" },
      };
      const next = jest.fn();

      const error = new Error("Wrong user data");
      error.statusCode = 403;

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
