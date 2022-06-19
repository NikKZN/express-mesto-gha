const Card = require('../models/card');
const { ERROR_CODE_400, ERROR_CODE_404, ERROR_CODE_500 } = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(ERROR_CODE_500).send({ message: `Ошибка по-умолчанию: ${err}` });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERROR_CODE_500).send({ message: `Ошибка по-умолчанию: ${err}` });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(ERROR_CODE_404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERROR_CODE_500).send({ message: `Ошибка по-умолчанию: ${err}` });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(ERROR_CODE_404).send({ message: 'Карточка не найдена' });
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      return res.status(ERROR_CODE_400).send({ message: `Переданы некорректные данные: ${err.name}` });
    }
    return res.status(ERROR_CODE_500).send({ message: `Ошибка по-умолчанию: ${err}` });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(ERROR_CODE_404).send({ message: 'Карточка не найдена' });
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      return res.status(ERROR_CODE_400).send({ message: `Переданы некорректные данные: ${err.name}` });
    }
    return res.status(ERROR_CODE_500).send({ message: `Ошибка по-умолчанию: ${err}` });
  });
