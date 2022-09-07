const env = require("../libs/env");

const status = require("http-status");
const multer = require("multer");
const firebaseStorage = require("multer-firebase-storage");
const firebaseInstance = require("../libs/firebase");

const storageOptions = (folder, prefix) => ({
	bucketName: env.bucketName,
	directoryPath: folder,
	namePrefix: prefix,
	unique: true,
	public: true,
});

const upload = (prefix, folder, field) => {
	return multer({
		storage: firebaseStorage(storageOptions(folder, prefix), firebaseInstance),
		fileFilter: (req, file, cb) => {
			if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
				cb(null, true);
			} else {
				cb(null, false);
				return cb(new Error("Only .png, .jpg and .jpeg format allowed!", { cause: { code: status.BAD_REQUEST } }));
			}
		},
	}).single(field);
};

const deleteFile = (imageUrl) => firebaseInstance.storage().bucket(env.bucketName).file(imageUrl).delete();

module.exports = { upload, deleteFile };
