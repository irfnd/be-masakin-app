const yup = require("yup");

module.exports = yup.object({
	token: yup.string().trim().required("Verify Token required!"),
});
