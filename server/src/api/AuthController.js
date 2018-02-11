require("dotenv").config();
const jwt = require("jsonwebtoken");
const bluebird = require("bluebird");
const { Token } = require("../database/models");


bluebird.promisifyAll(jwt);
const SECRET_KEY = process.env.SECRET_KEY;
const pattern = /^Vofus\s/;


/**
 * Проверяем формат токена
 * @param token
 * @returns {string | * | void}
 */
function prepareToken(token) {
	if (!token || !token.match(pattern)) {
		throw new Error("Отсутствует токен");
	}

	return token.replace(pattern, "");
}


/**
 * Создаем токен
 * @param user
 * @returns {Promise<{accessToken: {String}}>}
 */
async function generateToken(user) {
	global.console.log("SECRET_KEY: ", SECRET_KEY);
	const newAccessToken = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1d" });
	const params = {
		accessToken: newAccessToken,
		userId: user.id,
		expiresIn: jwt.decode(newAccessToken).exp
	};

	try {
		await Token.findOneAndRemove({ userId: user.id });
		const { accessToken, userId } = await new Token(params).save();

		return { accessToken: `Vofus ${accessToken}`, userId };
	} catch (e) {
		return null;
	}
}


/**
 * Удаляем токен
 * @param token
 * @returns {Promise<Boolean>}
 */
async function removeToken(token) {
	const resToken = prepareToken(token);

	try {
		return await Token.findOneAndRemove({ accessToken: resToken });
	} catch (e) {
		global.console.error(e);
		throw new Error("Ошибка при удалении токена");
	}
}


/**
 * Получаем данные из токена
 * @param rawToken
 * @returns {Promise<*>}
 */
async function getPayload(rawToken) {
	const token = prepareToken(rawToken);

	try {
		return await jwt.verifyAsync(token, SECRET_KEY);
	} catch (error) {
		throw new Error("Токен не прошел проверку");
	}
}


/**
 * Проверяем токен на существование и на время жизни
 * @param rawToken
 * @returns {Promise<Boolean>}
 */
async function isAuthorize(rawToken) {
	const token = prepareToken(rawToken);
	const now = Math.floor(Date.now() / 1000);

	try {
		const result = await Token.findOne({ accessToken: token });

		if (result && result.expiresIn) {
			return now <= result.expiresIn;
		}

		return false;
	} catch (e) {
		throw new Error("Ошибка проверки авторизации");
	}
}


/**
 * Middleware для проверки авторизации
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function authMiddleware(req, res, next) {
	const { authorization: token } = req.headers;

	try {
		const isAuth = await isAuthorize(token);

		if (!isAuth) {
			return res.status(401).send({ code: 401, message: "Срок авторизации истек" });
		}

		return next();
	} catch (e) {
		return next(e);
	}
}


module.exports = {
	generateToken,
	removeToken,
	getPayload,
	authMiddleware
};
