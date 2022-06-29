const responseSuccess = (message, results) => {
	return {
		success: true,
		message: `Data ${message} successfully.`,
		results,
	};
};

const responseError = (error) => {
	return {
		success: false,
		message: "Something went wrong!",
		errors: error,
	};
};

module.exports = { responseSuccess, responseError };
