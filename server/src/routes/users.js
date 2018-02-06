const {createUser, getUser} = require("../api/UserController");
const {getPayload, authMiddleware} = require("../api/AuthController");
const router = require("express").Router();

/**
 * Регистрация пользователя
 */
router.post("/", async (req, res) => {
  try {
    const newUser = await createUser(req.body);

    res.send(newUser);
  } catch (e) {
    res.status(400).send({ code: 400, message: e.message });
  }
});

router.use("/:id", authMiddleware);
router.get("/:id", async (req, res) => {
	const {authorization: token} = req.headers;
	const {id: userId} = req.params;

	try {
		const payload = await getPayload(token);

		if (!payload || payload.userId !== userId) {
			return res.status(403).send({code: 403, message: "Попытка получить данные другого пользователя"});
		}

		const user = await getUser(userId);

		if (!user) {
			return res.status(404).send({code: 404, message: "Пользователь не найден"});
		}

		return res.status(200).send(user);
	} catch (e) {
		res.status(400).send({code: 400, message: e.message});
	}
});


module.exports = router;
