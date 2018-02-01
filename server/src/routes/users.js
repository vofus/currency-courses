const { checkUser, createUser } = require("../api/UserController");
const router = require("express").Router();

/**
 * Регистрация пользователя
 */
router.post("/", async (req, res) => {
  try {
    const newUser = await createUser(req.body);

    req.session.user = { ...newUser };
    res.send(newUser);
  } catch (e) {
    res.status(400).send({ code: 400, message: e.message });
  }
});

/**
 * Login
 */
router.post("/login", async (req, res) => {
  try {
    const user = await checkUser(req.body);

    req.session.user = { ...user };
    res.send(user);
  } catch (e) {
    res.status(403).send({ code: 403, message: e.message });
  }
});

/**
 * Logout
 */
router.post("/logout", (req, res) => {
  if (req.session.user) {
    delete req.session.user;
  }

  res.send();
});

module.exports = router;
