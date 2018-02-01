const { createConfig, getConfig, updateConfig, removeConfig } = require("../api/ConfigController");
const router = require("express").Router();

router.use(async (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  const error = new Error("Unauthorized");

  return res.status(401).send({ code: 401, message: error.message });
});

router.post("/", async (req, res) => {
  try {
    const newConfig = await createConfig(req.body);

    res.send(newConfig);
  } catch (e) {
    res.status(400).send({ code: 400, message: e.message });
  }
});

router.get("/:id/:userId?", async (req, res) => {
  const { params: { id }, query: { userId } } = req;
  try {
    const config = await getConfig({ id, userId });
    res.send(config);
  } catch (e) {
    res.status(400).send({ code: 400, message: e.message });
  }
});

router.put("/:id", async (req, res) => {
  if (req.params.id !== req.body.id) {
    res.status(400).send({ code: 403, message: "Неверный путь для обновления" });
  }
  try {
    const config = await updateConfig(req.body);
    res.send(config);
  } catch (e) {
    res.status(400).send({ code: 400, message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { params: { id } } = req;
  const { user: { id: userId } } = req.session;

  try {
    await removeConfig({ id, userId });
    res.status(200).send();
  } catch (e) {
    res.status(400).send({ code: 400, message: e.message });
  }
});

module.exports = router;
