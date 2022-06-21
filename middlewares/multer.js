/* eslint-disable no-undef */
const multer = require("multer");
const path = require("path");

const dirPhotoProfile = path.join(__dirname, "../public/users/images");
const dirPhotoRecipe = path.join(__dirname, "../public/recipes/images");
const dirVideosRecipe = path.join(__dirname, "../public/recipes/videos");

const storagePhotoProfile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dirPhotoProfile);
  },
  filename: (req, file, cb) => {
    const fileName =
      req.body.email + "-photo-profile" + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const storagePhotoRecipe = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dirPhotoRecipe);
  },
  filename: (req, file, cb) => {
    const fileName =
      req.body.title.toLowerCase().split(" ").join("-") +
      "-photo-recipe" +
      path.extname(file.originalname);
    cb(null, fileName);
  },
});

const storageVideosRecipe = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dirVideosRecipe);
  },
  filename: (req, file, cb) => {
    const fileName =
      req.body.title.toLowerCase().split(" ").join("-") +
      "-videos-recipe" +
      path.extname(file.originalname);
    cb(null, fileName);
  },
});

exports.uploadPhotoProfile = multer({
  storage: storagePhotoProfile,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

exports.uploadPhotoRecipe = multer({
  storage: storagePhotoRecipe,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

exports.uploadVideosRecipe = multer({
  storage: storageVideosRecipe,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "video/mp4" ||
      file.mimetype == "video/3gpp" ||
      file.mimetype == "video/x-msvideo" ||
      file.mimetype == "video/x-matroska" ||
      file.mimetype == "video/quicktime"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("Only .mp4, .3gp, .avi, .mkv, and .mov format allowed!")
      );
    }
  },
});
