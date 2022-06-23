class Error400 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.errorMessage = message;
  }
}

module.exports = Error400;
