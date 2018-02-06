const apiRouter = require("express").Router();

const authRouter = require("./auth");
const usersRouter = require("./users");
const configRouter = require("./configs");


apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/configs", configRouter);

module.exports = apiRouter;
