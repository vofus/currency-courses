require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const { createConnection } = require("./database");
const bodyParser = require("body-parser");
const express = require("express");
const apiRouter = require("./routes");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const { PORT } = process.env;
const DAY = 24 * 3600 * 1000;
const app = express();

(async () => {
  try {
    await createConnection();

		app.use(express.static(path.resolve(__dirname, "../../client/build")));
    app.use(
      session({
        secret: "Currensy Courses",
        cookie: { maxAge: DAY },
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
      })
    );

    app.use(bodyParser.json());
    app.use("/api", apiRouter);

    app.listen(PORT, () => {
      global.console.log(`Server started on ${PORT} port...`);
    });
  } catch (e) {
    global.console.error(e);
  }
})();
