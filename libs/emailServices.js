require("dotenv").config();
const { ENV, SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, EMAIL_FROM, SERVER_URL, SERVER_LOCAL_URL } = process.env;

const serverUrl = ENV === "production" ? SERVER_URL : SERVER_LOCAL_URL;

const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
	host: SMTP_HOST,
	port: SMTP_PORT,
	auth: {
		user: SMTP_USERNAME,
		pass: SMTP_PASSWORD,
	},
});

const sendEmail = async (to, subject, text) => {
	const msg = { from: EMAIL_FROM, to, subject, text };
	await transport.sendMail(msg);
};

const sendVerificationEmail = async (to, token) => {
	const subject = "Email Verification - Masakin App";
	const verificationEmailUrl = `http://${serverUrl}/auth/verify?token=${token}`;
	const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
	await sendEmail(to, subject, text);
};

module.exports = {
	transport,
	sendEmail,
	sendVerificationEmail,
};
