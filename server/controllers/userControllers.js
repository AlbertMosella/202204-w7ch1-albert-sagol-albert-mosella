const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../db/models/User");

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error("Wrong user data");
    error.statusCode = 403;

    next(error);
  }

  const userData = {
    username: user.username,
    id: user.id,
  };

  const correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword) {
    const error = new Error("Wrong user data");
    error.statusCode = 403;

    next(error);
  } else {
    const token = jwt.sign(userData, process.env.JWT_SECRET);

    res.status(200).json({ token });
  }
};

module.exports = loginUser;
