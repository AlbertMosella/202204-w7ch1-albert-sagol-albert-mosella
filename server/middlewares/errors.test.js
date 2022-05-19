const { notFoundError, errorDefault } = require("./errors");

describe("Given a notFoundError function", () => {
  describe("When it's invoked with a response", () => {
    test("Then it should call the response status method with a 404", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: () => {},
      };
      const expectedStatus = 404;

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method with the message 'Endpoint not found'", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedText = { msg: "Endpoint not found" };

      notFoundError(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedText);
    });
  });
});

describe("Given a errorDefault function", () => {
  describe("When it's called with a error and response", () => {
    const error = {
      errorMessage: undefined,
      statusCode: undefined,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    test("Then it should call the response status method with a 500", () => {
      const expectedStatus = 500;

      errorDefault(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method with the message 'Error 500'", () => {
      const expectedText = { msg: "General error" };

      errorDefault(error, null, res);

      expect(res.json).toHaveBeenCalledWith(expectedText);
    });
  });
});
