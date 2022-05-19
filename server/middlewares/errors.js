const chalk = require("chalk");
const debug = require("debug")("series:errors");

const notFoundError = (req, res) => {
  debug(chalk.red("Endpoint not found"));

  res.status(404).json({ msg: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const errorDefault = (error, req, res, next) => {
  const errorMessage = error.message ?? "General error";
  const errorStatus = error.statusCode ?? 500;

  debug(chalk.red(error.message));

  res.status(errorStatus).json({ msg: errorMessage });
};

module.exports = { notFoundError, errorDefault };
