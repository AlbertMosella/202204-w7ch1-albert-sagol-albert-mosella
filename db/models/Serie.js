const { model, Schema } = require("mongoose");

const SerieSchema = new Schema({
  name: { type: String, required: true },
  platform: { type: Schema.Types.ObjectId, required: true },
});

const Serie = model("Serie", SerieSchema, "series");

module.exports = Serie;
