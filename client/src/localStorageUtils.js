const KEY = "CurrensyCoursesAuthToken";


/**
 * Сохраняем токен
 * @param userId
 * @param token
 * @returns {Promise<void>}
 */
export const saveToken = async (userId, token) => {
	try {
		await new Promise(resolve => setTimeout(() => resolve(localStorage.setItem(`${KEY}__${userId}`, token)), 0));
	} catch (e) {
		throw new Error("Ошибка при сохранении токена");
	}
};


/**
 * Извлекаем токен
 * @param userId
 * @returns {Promise<String>}
 */
export const getToken = async (userId) => {
	try {
		return await new Promise(resolve => setTimeout(() => resolve(localStorage.getItem(`${KEY}__${userId}`)), 0));
	} catch (e) {
		throw new Error("Ошибка при извлечении токена");
	}
};


/**
 * Удаляем токен
 * @param userId
 * @returns {Promise<String>}
 */
export const removeToken = async (userId) => {
	try {
		return await new Promise(resolve => setTimeout(() => resolve(localStorage.removeItem(`${KEY}__${userId}`)), 0));
	} catch (e) {
		throw new Error("Ошибка при удалении токена");
	}
};