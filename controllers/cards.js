const Card = require('../models/card');
const Error400 = require('../errors/error400');
const Error404 = require('../errors/error404');
const Error403 = require('../errors/error403');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        Error400('Переданы некорректные данные при создании карточки');
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        Error404();
      }
      if (card.owner.toString() !== req.user._id) {
        Error403();
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ message: 'Удаление прошло успешно' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        Error400('Переданы некорректные данные для удаления карточки');
      }
      if (err.statusCode === 404) {
        Error404('Передан несуществующий _id карточки');
      }
      if (err.statusCode === 403) {
        Error403();
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => {
    if (!card) {
      Error404();
    }
    res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      Error400('Переданы некорректные данные для постановки лайка');
    }
    if (err.statusCode === 404) {
      Error404('Передан несуществующий _id карточки');
    }
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => {
    if (!card) {
      Error404();
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      Error400('Переданы некорректные данные для снятия лайка');
    }
    if (err.statusCode === 404) {
      Error404('Передан несуществующий _id карточки');
    }
  })
  .catch(next);
