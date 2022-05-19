const express = require("express");

const { getPlatforms } = require("../controllers/platformsControllers");

const platformRouter = express.Router();

platformRouter.get("/", getPlatforms);

module.exports = platformRouter;
