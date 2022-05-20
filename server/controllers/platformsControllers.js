const jsonwebtoken = require("jsonwebtoken");
const Platform = require("../../db/models/Platform");

const getPlatforms = async (req, res) => {
  const platforms = await Platform.find();
  res.status(200).json({ platforms });
};

const createPlatform = async (req, res, next) => {
  const { name } = req.body;
  const platform = await Platform.findOne({ name });

  if (platform) {
    const error = new Error();
    error.statusCode = 409;
    error.customMessage = "Platform already existis";

    next(error);
  }
  try {
    const newPlatform = await Platform.create({
      name,
    });
    res
      .status(201)
      .json({ user: { name: newPlatform.name, id: newPlatform.id } });
  } catch (error) {
    error.statusCode = 400;
    error.customMessage = "Error platform creation";

    next(error);
  }
};

const editPlatform = async (req, res, next) => {
  const token = req.header.Authorization;

  const tokenCoded = token.replace("Bearer ", "");

  const tokenDecoded = jsonwebtoken.decode(tokenCoded, process.env.JWT_SECRET);
};

module.exports = { createPlatform, getPlatforms };
