const auth = require("./auth");

const mockId = { id: 3 };

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  verify: () => mockId,
}));

describe("Given an auth function", () => {
  describe("When it receives a request with an invalid token", () => {
    test("Then the next function should be called", () => {
      const req = {
        headers: {
          Authorization: "Bearer ",
        },
      };

      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
