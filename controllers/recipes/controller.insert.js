const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { recipesModel } = require("../../models");
const { uploadPhotoRecipe } = require("../../middlewares/multer");

const upload = uploadPhotoRecipe.single("photo_recipe");

exports.insertOne = (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        throw { code: 400, message: err.message };
      } else {
        const data = {
          ...req.body,
          photo_recipe: req.file
            ? "/" + req.file.path.split("\\").slice(-2).join("/")
            : null,
        };
        const results = await recipesModel.insert.insertOneModel(data);
        res
          .status(200)
          .json(responseSuccess("Successfully added data.", results));
      }
    } catch (err) {
      res.status(err.code).json(responseError(err.message));
    }
  });
};
