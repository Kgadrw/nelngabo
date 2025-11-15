const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: String, required: true },
    coverUrl: { type: String, required: true },
    tracks: [{ type: String, required: true }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Album", albumSchema);

