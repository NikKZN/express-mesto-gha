class Error403 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.errorMessage = message;
  }
}

module.exports = Error403;
