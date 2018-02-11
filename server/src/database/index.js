require("dotenv").config();
const mongoose = require("mongoose");

async function createConnection() {
  const { DB_URL } = process.env;

  try {
    const connection = await mongoose.connect(DB_URL);

    return connection;
  } catch (e) {
    global.console.error(e);
    throw e;
  }
}

module.exports = { createConnection };
