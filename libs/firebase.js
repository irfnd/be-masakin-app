const env = require("../libs/env");

const admin = require("firebase-admin");
const credentials = require("./credentials.json");

const firebaseInstance = admin.initializeApp({
	credential: admin.credential.cert(credentials),
	storageBucket: env.bucketName,
});

module.exports = firebaseInstance;
