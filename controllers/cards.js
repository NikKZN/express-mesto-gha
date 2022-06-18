// const { Error } = require('mongoose');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      res.status(500).send({ message: `Ошибка по-умолчанию: ${err}` });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(500).send({ message: `Ошибка по-умолчанию: ${err}` });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      res.send({ message: `Неизвестная ошибка: ${err}` });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }
    return res.status(200).send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      return res.status(400).send({ message: `Переданы некорректные данные: ${err.name}` });
    }
    return res.status(500).send({ message: `Ошибка по-умолчанию: ${err}` });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }
    return res.status(200).send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      return res.status(400).send({ message: `Переданы некорректные данные: ${err.name}` });
    }
    return res.status(500).send({ message: `Ошибка по-умолчанию: ${err}` });
  });
