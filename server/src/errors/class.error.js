// Custom error class
class ApiError extends Error {
	constructor(status, message) {
		super(message);
		this.status = status;
		this.isOperationalError = true;
		Error.captureStackTrace(this, this.constructor);
	}
}

export { ApiError };
