const chalk = require("chalk");
const mongoose = require("mongoose");
const debug = require("debug")("series:connectdb");

const connectDataBase = (dbUrl) =>
  new Promise((resolve, reject) => {
    mongoose.connect(dbUrl, (error) => {
      if (error) {
        debug(chalk.red("Error connecting to data base"), error.message);
        reject(new Error(`Error connecting to data base: ${error.message}`));
        return;
      }
      debug(chalk.green("Connected to DB"));
      resolve();
    });
  });

module.exports = connectDataBase;
