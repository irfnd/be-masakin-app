require("dotenv").config();
const { BUCKET_NAME } = process.env;

const admin = require("firebase-admin");
const credentials = require("./credentials.json");

const firebaseInstance = admin.initializeApp({
	credential: admin.credential.cert(credentials),
	storageBucket: BUCKET_NAME,
});

module.exports = firebaseInstance;
