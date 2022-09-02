const yup = require("yup");

module.exports = yup.object({
	email: yup.string().trim().lowercase().email("Email must be valid!").required("Email required!"),
	password: yup.string().trim().required("Password required!"),
});
