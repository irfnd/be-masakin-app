const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { recipesModel } = require("../../models");
const { uploadPhotoRecipe } = require("../../middlewares/multer");

const upload = uploadPhotoRecipe.single("photo_recipe");

exports.updateOne = (req, res) => {
  upload(req, res, async (err) => {
    try {
      const { id } = req.params;
      if (err) {
        throw { code: 400, message: err.message };
      } else {
        const data = {
          ...req.body,
          photo_recipe: req.file
            ? "/" + req.file.path.split("\\").slice(-2).join("/")
            : null,
        };
        if (Number(id)) {
          const results = await recipesModel.update.updateOneModel(data, id);
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
