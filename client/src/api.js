import axios from "axios";

const api = axios.create({
	baseURL: "/api"
});
const fixerApi = axios.create({
	baseURL: "https://api.fixer.io/latest"
});

const USERS_URL = "/users";
const CONFIGS_URL = "/configs";


/**
 * Обрабатываем ошибку HTTP
 * @param e
 */
function prepareError(e) {
	if (e.response && e.response.data && e.response.data.message && e.response.data.code) {
		throw e.response.data;
	}

	throw e;
}


/**
 * Авторизуем пользователя и получаем токены
 * @param username
 * @param password
 * @returns {Promise<{data: *}>}
 */
export async function authUser(username, password) {
	try {
		const res = await api.post("/auth", {username, password});

		return res ? res.data : null;
	} catch (e) {
		prepareError(e);
	}
}


/**
 * Выходим из системы, тем самым удаляем наш токен из БД
 * @param token
 * @returns {Promise<{data: *}>}
 */
export async function logout(token) {
	const headers = {"Authorization": token};

	try {
		const res = await api.get("/auth/logout", {headers});

		return res ? res.data : null;
	} catch (e) {
		prepareError(e);
	}
}


/**
 * Запрашиваем пользователя по ID
 * @param id
 * @param token
 * @returns {Promise<{data: *}>}
 */
export async function getUser(id, token) {
	const headers = {"Authorization": token};

	try {
		const res = await api.get(`${USERS_URL}/${id}`, {headers});

		return res ? res.data : null;
	} catch (e) {
		prepareError(e);
	}
}


/**
 * Создаем нового пользователя
 * @param username
 * @param password
 * @returns {Promise<{data: *}>}
 */
export async function createUser(username, password) {
	try {
		const res = await api.post(USERS_URL, {username, password});

		return res ? res.data : null;
	} catch (e) {
		prepareError(e);
	}
}


/**
 * Запрашиваем настройки для пользователя
 * @param token
 * @returns {Promise<null>}
 */
export async function getConfig(token) {
	const headers = {"Authorization": token};

	try {
		const res = await api.get(CONFIGS_URL, {headers});

		return res ? res.data : null;
	} catch (e) {
		prepareError(e);
	}
}


/**
 * Обновляем конфигурацию
 * @param config
 * @param token
 * @returns {Promise<null>}
 */
export async function updateConfig(config, token) {
	const headers = {"Authorization": token};
	const {id} = config;

	try {
		const res = await api.put(`${CONFIGS_URL}/${id}`, config, {headers});

		return res ? res.data : null;
	} catch (e) {
		prepareError(e);
	}
}


/**
 * Запрашиваем курсы относительно базовой валюты
 * @param base
 * @returns {Promise<void>}
 */
export async function getRates(base) {
	const params = {base};

	try {
		const res = await fixerApi.get("", {params});

		return res ? res.data : null;
	} catch (e) {
		prepareError(e);
	}
}


/**
 * Конвертируем
 * @param from
 * @param to
 * @returns {Promise<void>}
 */
export async function convert(from, to) {
	const params = {base: from, symbols: to};

	try {
		const res = await fixerApi.get("", {params});

		if (res.data && res.data.rates) {
			return res.data.rates[to];
		}
	} catch (e) {
		prepareError(e);
	}
}
