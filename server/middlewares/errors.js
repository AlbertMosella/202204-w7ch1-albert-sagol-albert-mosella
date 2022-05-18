const chalk = require("chalk");
const debug = require("debug")("series:errors");

const notFoundError = (req, res) => {
  res.status(404).json({ msg: "Endpoint not found" });
  debug(chalk.red("Endpoint not found"));
};

// eslint-disable-next-line no-unused-vars
const errorDefault = (error, req, res, next) => {
  debug(chalk.red("Error 500"));
  res.status(500).json({ msg: "Error 500" });
};

module.exports = { notFoundError, errorDefault };
