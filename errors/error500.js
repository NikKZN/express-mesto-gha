class Error500 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.errorMessage = message;
  }
}

module.exports = Error500;
