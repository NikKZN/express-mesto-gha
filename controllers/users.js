const User = require('../models/user');
const { ERROR_CODE_400, ERROR_CODE_404, ERROR_CODE_500 } = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(ERROR_CODE_500).send({ message: `Ошибка по-умолчанию: ${err}` });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  User.create({
    name,
    about,
    avatar,
    email,
    password,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({ message: `${err.name}: Переданы некорректные данные` });
      }
      return res.status(ERROR_CODE_500).send({ message: `Ошибка по-умолчанию: ${err}` });
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({ message: `Переданы некорректные данные: ${err.name}` });
      }
      return res.status(ERROR_CODE_500).send({ message: `Ошибка по-умолчанию: ${err}` });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({ message: `Переданы некорректные данные: ${err.name}` });
      }
      return res.status(ERROR_CODE_500).send({ message: `Ошибка по-умолчанию: ${err}` });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({ message: `Переданы некорректные данные: ${err.name}` });
      }
      return res.status(ERROR_CODE_500).send({ message: `Ошибка по-умолчанию: ${err}` });
    });
};
