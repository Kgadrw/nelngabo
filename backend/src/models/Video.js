const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    youtubeId: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Video", videoSchema);

