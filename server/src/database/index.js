const mongoose = require("mongoose");

async function createConnection() {
  const { DB_USER, DB_PASSWORD } = process.env;

  try {
    const connection = await mongoose.connect(
      `mongodb://${DB_USER}:${DB_PASSWORD}@ds121088.mlab.com:21088/currency_courses`
    );

    return connection;
  } catch (e) {
    global.console.error(e);
    throw e;
  }
}

module.exports = { createConnection };
