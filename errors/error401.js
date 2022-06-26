const Error401 = (message) => {
  const error = new Error(message);

  error.statusCode = 401;

  throw error;
};

module.exports = Error401;
