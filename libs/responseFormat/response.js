const response = (isSuccess, message, results, error = null) => {
	return {
		success: isSuccess,
		message: message,
		results: results,
		errors: error,
	};
};

module.exports = response;
