const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "usernameRequired"],
    maxlength: [32, "tooLong"],
    minlength: [6, "tooShort"],
    match: [/^[A-Za-z0-9]+$/, "usernameIncorrect"]
  },
  password: {
    type: String,
    required: [true, "passwordRequired"]
  }
});

module.exports = mongoose.model("User", User);
