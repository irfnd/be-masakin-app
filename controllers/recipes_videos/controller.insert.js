const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { recipesVideosModel } = require("../../models");
const { uploadVideosRecipe } = require("../../middlewares/multer");

const upload = uploadVideosRecipe.single("recipe_video");

exports.insertOne = (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        throw { code: 400, message: err.message };
      } else {
        const data = {
          ...req.body,
          recipe_video: req.file
            ? "/" + req.file.path.split("\\").slice(-2).join("/")
            : null,
        };
        const results = await recipesVideosModel.insert.insertOneModel(data);
        res
          .status(200)
          .json(responseSuccess("Successfully added data.", results));
      }
    } catch (err) {
      res.status(err.code).json(responseError(err.message));
    }
  });
};
