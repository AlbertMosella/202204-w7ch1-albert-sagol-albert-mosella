const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const debug = require("debug")("series:users");
const User = require("../../db/models/User");

const loginUser = async (req, res, next) => {
  debug(chalk.green("Login request received"));
  const { name, password } = req.body;

  const user = await User.findOne({ name });

  if (!user) {
    const error = new Error("Wrong username or password");
    error.statusCode = 403;
    debug(chalk.red("Wrong user data"));
    next(error);
    return;
  }

  const userData = {
    name: user.name,
    id: user.id,
  };

  const correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword) {
    const error = new Error("Wrong username or password");
    error.statusCode = 403;

    next(error);
  } else {
    const token = jwt.sign(userData, process.env.JWT_SECRET);

    res.status(200).json({ token });
  }
};

const registerUser = async (req, res, next) => {
  const { name, admin, series, password } = req.body;
  const user = await User.findOne({ name });

  if (user) {
    const error = new Error();
    error.statusCode = 409;
    error.customMessage = "User already existis";

    next(error);
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      name,
      admin,
      series,
      password: encryptedPassword,
    });
    res.status(201).json({ user: { name: newUser.name, id: newUser.id } });
  } catch (error) {
    error.statusCode = 400;
    error.customMessage = "Wrong user data";

    next(error);
  }
};

module.exports = { loginUser, registerUser };
