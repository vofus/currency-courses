const KEY = "CurrencyCoursesAuthToken";


/**
 * Сохраняем токен
 * @param userId
 * @param accessToken
 * @returns {Promise<void>}
 */
export const saveToken = async (userId, accessToken) => {
	try {
		const dataStr = JSON.stringify({userId, accessToken});
		await new Promise(resolve => setTimeout(() => resolve(localStorage.setItem(KEY, dataStr)), 0));
	} catch (e) {
		throw new Error("Ошибка при сохранении токена");
	}
};


/**
 * Извлекаем токен
 * @returns {Promise<String>}
 */
export const getToken = async () => {
	try {
		const rawData = await new Promise(resolve => setTimeout(() => resolve(localStorage.getItem(KEY)), 0));

		return JSON.parse(rawData);
	} catch (e) {
		throw new Error("Ошибка при извлечении токена");
	}
};


/**
 * Удаляем токен
 * @returns {Promise<String>}
 */
export const removeToken = async () => {
	try {
		return await new Promise(resolve => setTimeout(() => resolve(localStorage.removeItem(KEY)), 0));
	} catch (e) {
		throw new Error("Ошибка при удалении токена");
	}
};