const KEY = "CurrensyCoursesAuthToken";


/**
 * Сохраняем токен
 * @param token
 * @returns {Promise<void>}
 */
export const saveToken = async (token) => {
	try {
		await new Promise(resolve => setTimeout(() => resolve(localStorage.setItem(KEY, token)), 0));
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
		return await new Promise(resolve => setTimeout(() => resolve(localStorage.getItem(KEY)), 0));
	} catch (e) {
		throw new Error("Ошибка при извлечении токена");
	}
};