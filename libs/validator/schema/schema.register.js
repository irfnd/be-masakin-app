const yup = require("yup");
require("yup-password")(yup);

module.exports = yup.object({
	name: yup.string().trim().max(60, "Name must be less than 60 character!").required("Name required!"),
	email: yup
		.string()
		.trim()
		.lowercase()
		.max(50, "Email must be less than 60 character!")
		.email("Email must be valid!")
		.required("Email required!"),
	phoneNumber: yup
		.string()
		.trim()
		.max(16, "Phone number must be less than 16 numbers!")
		.matches(
			/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
			"Phone number must be valid!"
		)
		.required("Phone number required!"),
	password: yup
		.string()
		.trim()
		.min(8, "Password must contain at least 8 characters")
		.minLowercase(1, "Password must contain at least 1 lowercase character")
		.minUppercase(1, "Password must contain at least 1 uppercase character")
		.minNumbers(1, "Password must contain at least 1 number")
		.minSymbols(1, "Password must contain at least 1 special character")
		.required("Password required!"),
});
