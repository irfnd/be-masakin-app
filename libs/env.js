require("dotenv").config();

const env = {
	modeEnv: process.env.ENV,
	serverUrl: process.env.SERVER_URL,
	serverLocalUrl: process.env.SERVER_LOCAL_URL,
	dbUri: process.env.DATABASE_URI,
	dbLocalUri: process.env.DATABASE_LOCAL_URI,
	dbSync: process.env.DATABASE_SYNC,
	redisUri: process.env.REDIS_URI,
	secretAccessToken: process.env.SECRET_ACCESS_TOKEN,
	secretRefreshToken: process.env.SECRET_REFRESH_TOKEN,
	expiresAccessToken: process.env.EXPIRES_ACCESS_TOKEN,
	expiresRefreshToken: process.env.EXPIRES_REFRESH_TOKEN,
	expiresVerifyToken: process.env.EXPIRES_VERIFY_TOKEN,
	bucketName: process.env.BUCKET_NAME,
	smtpHost: process.env.SMTP_HOST,
	smtpPort: process.env.SMTP_PORT,
	smtpUsername: process.env.SMTP_USERNAME,
	smtpPassword: process.env.SMTP_PASSWORD,
	emailFrom: process.env.EMAIL_FROM,
	clientUrl: process.env.CLIENT_URL,
};

module.exports = env;
