const fs = require("fs");
const path = require("path");

exports.deleteFile = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.unlink(path.join(__dirname, "../../public/", filePath), (err) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				resolve("Successfully deleted file.");
			}
		});
	});
};
