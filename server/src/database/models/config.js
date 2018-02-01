const mongoose = require("mongoose");

const Config = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: [true, "userIdRequired"]
  },
  baseCurrensy: {
    type: String,
    required: [true, "baseCurrensyRequired"]
  },
  favorites: [
    {
      name: {
        type: String,
        required: true
      },
      order: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("Config", Config);
