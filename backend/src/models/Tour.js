const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    city: { type: String, required: true },
    venue: { type: String, required: true },
    ticketUrl: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Tour", tourSchema);

