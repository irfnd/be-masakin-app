const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { usersModel } = require("../../models");
const { uploadImage } = require("../../middlewares/multer");

const upload = uploadImage.single("photo_profile");

exports.insertOne = (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        throw { code: 400, message: err.message };
      } else {
        const data = {
          ...req.body,
          photo_profile: req.file
            ? "/" + req.file.path.split("\\").slice(-2).join("/")
            : null,
        };
        const results = await usersModel.insert.insertOneModel(data);
        res
          .status(200)
          .json(responseSuccess("Successfully added data.", results));
      }
    } catch (err) {
      res.status(err.code).json(responseError(err.message));
    }
  });
};
