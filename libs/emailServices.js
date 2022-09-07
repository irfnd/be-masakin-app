const env = require("../libs/env");

const serverUrl = env.modeEnv === "production" ? env.serverUrl : env.serverLocalUrl;
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
	host: env.smtpHost,
	port: env.smtpPort,
	auth: {
		user: env.smtpUsername,
		pass: env.smtpPassword,
	},
});

const sendEmail = async (to, subject, text) => {
	const msg = { from: env.emailFrom, to, subject, text };
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
