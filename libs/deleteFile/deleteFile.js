/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");

exports.deleteFile = (folder, filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(
      path.join(__dirname, `../../public/${folder}`, filePath),
      (err) => {
        if (err) {
          reject({ code: 500, message: err.message });
        } else {
          resolve("Successfully deleted file.");
        }
      }
    );
  });
};
