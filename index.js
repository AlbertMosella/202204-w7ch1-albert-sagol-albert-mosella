require("dotenv").config();
const debug = require("debug")("series:root");
const chalk = require("chalk");
const connectDataBase = require("./db/index");
const app = require("./server/index");
const { initializeServer } = require("./server/serverInitializer");

const port = process.env.PORT || 4000;
const dbUrl = process.env.MONGO_DB;

(async () => {
  try {
    await connectDataBase(dbUrl);
    await initializeServer(port, app);
  } catch (error) {
    debug(chalk.red(`General Pete:`, error.message));
  }
})();
