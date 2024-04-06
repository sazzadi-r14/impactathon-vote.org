import { ApiError } from "./class.error.js";

const ApiErrorHandler = (err, req, res, next) => {
	console.log(err)
	
	// Parse errors that are operational.
	if (err.code === 'auth/id-token-expired') {
		err = new ApiError(401, "Token Expired");
	}

	const { status, message, isOperationalError } = err;
	
	if (isOperationalError) {
		res.status(status).json({
			status,
			message,
		});
	} else {
		console.log(err)
		
		res.status(500).json({
			message: "Internal Server Error"
		})
	}
};

export { ApiErrorHandler }