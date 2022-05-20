const chalk = require("chalk");
const debug = require("debug")("series:users");
const User = require("../../db/models/User");

const adminUser = async (req, res, next) => {
  const idToCheck = req.userId;

  const { admin } = await User.findOne({ idToCheck });

  if (!admin) {
    const error = new Error("User unauthorized");
    error.statusCode = 401;
    debug(chalk.red("User unauthorized"));

    next(error);
  } else {
    next();
  }
};

module.exports = { adminUser };
