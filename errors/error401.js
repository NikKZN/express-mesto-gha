class Error401 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.errorMessage = message;
  }
}

module.exports = Error401;
