const mongoose = require("mongoose");

const Token = new mongoose.Schema({
	accessToken: {
		type: String,
		unique: true,
		required: [true, "accessTokenRequired"]
	},
	userId: {
		type: String,
		unique: true,
		required: [true, "userIdRequired"]
	},
	expiresIn: {
		type: Number,
		required: [true, "expiresInRequired"]
	}
});

module.exports = mongoose.model("Token", Token);