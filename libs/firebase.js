const admin = require("firebase-admin");
const credentials = require("./credentials.json");

const firebaseInstance = admin.initializeApp({
	credential: admin.credential.cert(credentials),
	storageBucket: "resip-app.appspot.com",
});

module.exports = firebaseInstance;
