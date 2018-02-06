const { Config } = require("../database/models");

const { DEFAULT_BASE_CURRENSY } = process.env;

/**
 * Обрабатываем конфиг
 * @param {Config} config
 */
function prepareConfig(config) {
  const { _id: id, userId, baseCurrensy, favorites } = config;

  return {
    id,
    userId,
    baseCurrensy,
    favorites: favorites || []
  };
}

/**
 * Создаем объект конфигурации
 * @param {String} userId
 * @param {Object} configData
 */
async function createConfig(userId, configData) {
  try {
    const params = {
      ...configData,
			userId,
      baseCurrensy: configData.baseCurrensy || DEFAULT_BASE_CURRENSY
    };
    const config = await new Config(params).save();

    return prepareConfig(config);
  } catch (e) {
    global.console.error(e);
    if (e.toJSON().code === 11000) {
      throw new Error("Конфигурация для данного пользователя уже существует");
    }
    throw new Error("Произошла ошибка при создании новой конфигурации");
  }
}

/**
 * Запрашиваем конфигурацию
 * @param userId {String}
 */
async function getConfig(userId) {
  try {
		const config = await Config.findOne({userId});

		if (config) {
			return prepareConfig(config);
		}

		return null;
  } catch (e) {
    global.console.error(e);
    throw new Error("Конфигурация не найдена");
  }
}

/**
 * Обновляем данные о конфигурации
 * @param id
 * @param userId
 * @param configData
 * @returns {Promise<*>}
 */
async function updateConfig(id, userId, configData) {
  try {
		const resultPut = await Config.findOneAndUpdate({_id: id, userId}, configData);
		const resultGet = await Config.findOne({_id: id, userId});

		if (resultPut && resultGet) {
			return prepareConfig(resultGet);
		}

		return null;
  } catch (e) {
    global.console.error(e);
    throw new Error("Ошибка при обновлении конфигурации");
  }
}

/**
 * Удаляем конфигурацию
 * @param {Object} params
 */
async function removeConfig(params) {
  const { id, userId } = params;

  try {
		return await Config.findOneAndRemove({_id: id, userId});
  } catch (e) {
    global.console.error(e);
    throw new Error("Ошибка при удалении конфигурации");
  }
}

module.exports = {
  createConfig,
  getConfig,
  updateConfig,
  removeConfig
};
