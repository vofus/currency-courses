const usersRouter = require("./users");
const configRouter = require("./configs");
const apiRouter = require("express").Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/configs", configRouter);

module.exports = apiRouter;
