const responseSuccess = (message, results) => {
	return {
		success: true,
		message,
		results,
	};
};

const responseError = (error) => {
	return {
		success: false,
		message: "Something Wrong!",
		errors: error,
	};
};

module.exports = { responseSuccess, responseError };
