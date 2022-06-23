class Error404 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.errorMessage = message;
  }
}

module.exports = Error404;
