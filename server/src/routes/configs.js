const { createConfig, getConfig, updateConfig, removeConfig } = require("../api/ConfigController");
const {authMiddleware, getPayload} = require("../api/AuthController");
const router = require("express").Router();


router.use(authMiddleware);

router.post("/", async (req, res) => {
	const {headers: {authorization: token}} = req;

  try {
		const payload = await getPayload(token);
		const newConfig = await createConfig(payload.userId, req.body);

		return res.send(newConfig);
  } catch (e) {
		return res.status(400).send({code: 400, message: e.message});
  }
});

router.get("/", async (req, res) => {
	const {headers: {authorization: token}} = req;

  try {
		const payload = await getPayload(token);
		const config = await getConfig(payload.userId);

		return res.send(config);
  } catch (e) {
		return res.status(400).send({code: 400, message: e.message});
  }
});

router.put("/:id", async (req, res) => {
	const {params: {id}, headers: {authorization: token}} = req;

	if (id !== req.body.id) {
		return res.status(400).send({code: 400, message: "Неверный путь для обновления"});
	}

  try {
		const payload = await getPayload(token);
		const config = await updateConfig(id, payload.userId, req.body);
		return res.send(config);
  } catch (e) {
		return res.status(400).send({code: 400, message: e.message});
  }
});

router.delete("/:id", async (req, res) => {
	const {params: {id}, headers: {authorization: token}} = req;

  try {
		const payload = await getPayload(token);
		const result = await removeConfig({id, userId: payload.userId});

		if (!result) {
			return res.status(404).send({code: 404, message: "Конфигурация не найдена"});
		}

		return res.status(200).send();
  } catch (e) {
		return res.status(400).send({code: 400, message: e.message});
  }
});

module.exports = router;
