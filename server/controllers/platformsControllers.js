const Platform = require("../../db/models/Platform");

const getPlatforms = async (req, res) => {
  const platforms = await Platform.find();
  res.status(200).json({ platforms });
};

module.exports = { getPlatforms };
