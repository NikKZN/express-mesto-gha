const Error403 = () => {
  const error = new Error('Нельзя удалить карточку, созданную не вами');

  error.statusCode = 403;

  throw error;
};

module.exports = Error403;
