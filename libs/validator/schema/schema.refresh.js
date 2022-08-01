const yup = require("yup");

module.exports = yup.object({
	refreshToken: yup.string().trim().required("Refresh token required!"),
});
