const { adminUser } = require("./adminUser");

const testId = ({ id }) => id === "autorizedId";

jest.mock("../../db/models/User", () => ({
  ...jest.requireActual("../../db/models/User"),
  findOne: testId,
}));

describe("Given the adminUser function", () => {
  describe("When it's called and receives a request with id autorized", () => {
    test("Then it should call next", async () => {
      const req = { userId: "autorizedId" };
      const next = jest.fn();

      await adminUser(req, null, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it's called and receives a request with id unautorized", () => {
    test("Then it should call next with and error with statuscode 401 and message 'User unauthorized'", async () => {
      const req = { userId: "unautorizedId" };
      const next = jest.fn();
      const error = new Error("User unauthorized");
      error.statusCode = 401;

      await adminUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
