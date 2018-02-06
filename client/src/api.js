import axios from "axios";

const api = axios.create({
	baseURL: "/api"
});

const USERS_URL = "/users";


/**
 * Авторизуем пользователя и получаем токены
 * @param username
 * @param password
 * @returns {Promise<{data: *}>}
 */
export function authUser(username, password) {
	return api.post("/users/login", {username, password}).then(({data}) => data);
}


/**
 * Запрашиваем пользователя по ID
 * @param id
 * @param auth
 * @returns {Promise<{data: *}>}
 */
export function getUser(id, auth) {
	return api.get(`${USERS_URL}/${id}`, {headers: auth}).then(({data}) => data);
}


/**
 * Создаем нового пользователя
 * @param username
 * @param password
 * @returns {Promise<{data: *}>}
 */
export function createUser(username, password) {
	return api.post(USERS_URL, {username, password}).then(({data}) => data);
}
