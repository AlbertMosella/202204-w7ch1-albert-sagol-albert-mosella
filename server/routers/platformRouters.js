const express = require("express");

const { getPlatforms } = require("../controllers/platformsControllers");

const platformsRouter = express.Router();

platformsRouter.get("/", getPlatforms);

module.exports = platformsRouter;
