class ApiError extends Error {
  constructor(statusCode, message) {
    super(message); // Call the parent constructor with the message
    this.statusCode = statusCode;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;