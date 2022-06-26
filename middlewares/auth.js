const jwt = require('jsonwebtoken');
const Error401 = require('../errors/error401');

const SECRET_KEY = 'some-secret-key';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    Error401('Требуется авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    Error401('Передан неверный логин или пароль');
  }

  req.user = payload;

  next();
};
