const express = require("express");

const {
  getPlatforms,
  createPlatform,
} = require("../controllers/platformsControllers");

const platformRouter = express.Router();

platformRouter.get("/", getPlatforms);
platformRouter.post("/create", createPlatform);

module.exports = platformRouter;
