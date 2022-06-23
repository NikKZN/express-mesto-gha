const errHandler = (err, req, res, next) => {
  res.send({ message: err.message });
  next();
};

module.exports = errHandler;
