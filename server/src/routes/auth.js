const router = require("express").Router();
const {generateToken, removeToken} = require("../api/AuthController");
const {checkUser} = require("../api/UserController");


router.post("/", async (req, res) => {
	try {
		const user = await checkUser(req.body);

		if (user) {
			const token = await generateToken(user);

			return res.send(token);
		}

		res.status(401).send();
	} catch (e) {
		res.status(400).send({code: 400, message: e.message});
	}
});


router.get("/logout", async (req, res) => {
	const {authorization: token} = req.headers;

	try {
		const result = await removeToken(token);

		if (!result) {
			res.status(404).send({code: 404, message: "Токен не найден"});
		}

		return res.status(200).send();
	} catch (e) {
		res.status(400).send({code: 400, message: e.message});
	}
});


module.exports = router;
