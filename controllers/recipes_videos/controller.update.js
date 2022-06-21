const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { recipesVideosModel } = require("../../models");
const { uploadVideosRecipe } = require("../../middlewares/multer");

const upload = uploadVideosRecipe.single("recipe_video");

exports.updateOne = (req, res) => {
  upload(req, res, async (err) => {
    try {
      const { id } = req.params;
      if (err) {
        throw { code: 400, message: err.message };
      } else {
        const data = {
          ...req.body,
          recipe_video: req.file
            ? "/" + req.file.path.split("\\").slice(-2).join("/")
            : null,
        };
        if (Number(id)) {
          const results = await recipesVideosModel.update.updateOneModel(
            data,
            id
          );
          res
            .status(200)
            .json(responseSuccess("Successfully updated data.", results));
        } else {
          throw { code: 400, message: "Parameter must be a number!" };
        }
      }
    } catch (err) {
      res.status(err.code).json(responseError(err.message));
    }
  });
};
