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
 * @param {Object} configData
 */
async function createConfig(configData) {
  try {
    const params = {
      ...configData,
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
 * @param {Object: {id?: String, userId?: String}} params
 */
async function getConfig(params) {
  const { id, userId } = params;

  try {
    const config = await Config.findOne({ _id: id, userId });

    return prepareConfig(config);
  } catch (e) {
    global.console.error(e);
    throw new Error("Конфигурация не найдена");
  }
}

/**
 * Обновляем данные о конфигурации
 * @param {Object} configData
 */
async function updateConfig(configData) {
  const { id, userId } = configData;

  try {
    const config = await Config.findOneAndUpdate({ _id: id, userId }, configData);

    return prepareConfig(config);
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
    await Config.findOneAndRemove({ _id: id, userId });

    return true;
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
