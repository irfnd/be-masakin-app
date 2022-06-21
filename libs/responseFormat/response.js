const responseSuccess = (message, results) => {
  return {
    success: true,
    message: message,
    results: results,
  };
};

const responseError = (error) => {
  return {
    success: false,
    message: "Something Wrong!",
    results: null,
    errors: error,
  };
};

module.exports = { responseSuccess, responseError };
