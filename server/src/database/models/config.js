const mongoose = require("mongoose");

const Config = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: [true, "userIdRequired"]
  },
	baseCurrency: {
    type: String,
		required: [true, "baseCurrencyRequired"]
  },
  favorites: [
    {
      name: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("Config", Config);
