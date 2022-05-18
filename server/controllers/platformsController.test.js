const { mockPlatforms } = require("../../mocks/platforms");
const { getPlatforms } = require("./platformsControllers");

jest.mock("../../db/models/Platform", () => ({
  ...jest.requireActual("../../db/models/Platform"),
  find: jest.fn().mockResolvedValue(mockPlatforms),
}));

describe("Given a getPlatform function", () => {
  describe("When it's invoked with a response", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    test("Then it should call the response status method with a 200", async () => {
      await getPlatforms(null, res);

      const expectedStatus = 200;

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method with a list of Platforms", async () => {
      const expectedMock = { platforms: mockPlatforms };

      await getPlatforms(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedMock);
    });
  });
});
