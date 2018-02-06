const { User } = require("../database/models");
const crypto = require("crypto");

/**
 * Шифруем пароль пользователя
 * @param {String} text
 */
function hash(text) {
  return crypto
    .createHash("sha1")
    .update(text)
    .digest("base64");
}

/**
 * Обрабатываем сущность пользователя
 * @param {User} user
 */
function prepareUser(user) {
	if (!user) {
		throw new Error("Ошибка при обработке данных пользователя");
	}

  const { username, _id: id } = user;

  return {
    username,
    id
  };
}

/**
 * Создаем нового пользователя
 * @param {Object} userData
 * @returns {Promise<User>}
 */
async function createUser(userData) {
  const { username, password: rawPass } = userData;
  try {
    const newUser = await new User({
      username,
      password: hash(rawPass)
    }).save();

    return prepareUser(newUser);
  } catch (e) {
    global.console.error(e);
    if (e.toJSON().code === 11000) {
      throw new Error("Пользователь с таким именем уже существует");
    }
    throw new Error("Произошла ошибка при создании нового пользователя");
  }
}

/**
 * Запрашиваем пользователя по id
 * @param {String} id
 * @returns {Promise<User>}
 */
async function getUser(id) {
  try {
		const user = await User.findOne({_id: id});

		if (user) {
			return prepareUser(user);
		}

		return null;
  } catch (e) {
    global.console.error(e);
    throw new Error("Пользователь не найден");
  }
}

/**
 * Проверяем учетные данные пользователя
 * @param {Object} userData
 * @returns {Promise<User>}
 */
async function checkUser(userData) {
  const { username, password } = userData;

  try {
    const user = await User.findOne({ username });
		if (user && user.password === hash(password)) {
      return prepareUser(user);
    }

		throw null;
  } catch (e) {
    global.console.error(e);
		throw new Error("Неверный логин или пароль");
  }
}

/**
 * User API
 */
module.exports = {
  createUser,
  getUser,
  checkUser
};
