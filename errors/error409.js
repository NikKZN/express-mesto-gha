class Error409 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.errorMessage = message;
  }
}

module.exports = Error409;
