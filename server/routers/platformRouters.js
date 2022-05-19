const express = require("express");

const {
  getPlatforms,
  createPlatform,
} = require("../controllers/platformsControllers");
const { adminUser } = require("../middlewares/adminUser");

const platformRouter = express.Router();

platformRouter.get("/", getPlatforms);
platformRouter.post("/create", adminUser, createPlatform);

module.exports = platformRouter;
