const Error409 = () => {
  const error = new Error('Данный Email уже зарегистрирован');

  error.statusCode = 409;

  throw error;
};

module.exports = Error409;
