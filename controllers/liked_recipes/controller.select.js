const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { likedRecipesModel } = require("../../models");

exports.selectByUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (Number(id)) {
      const results = await likedRecipesModel.select.selectByUserModel(id);
      res
        .status(200)
        .json(responseSuccess("Successfully retrieved data.", results));
    } else {
      throw { code: 400, message: "Parameter must be a number!" };
    }
  } catch (err) {
    res.status(err.code).json(responseError(err.message));
  }
};

exports.selectByRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    if (Number(id)) {
      const results = await likedRecipesModel.select.selectByRecipeModel(id);
      res
        .status(200)
        .json(responseSuccess("Successfully retrieved data.", results));
    } else {
      throw { code: 400, message: "Parameter must be a number!" };
    }
  } catch (err) {
    res.status(err.code).json(responseError(err.message));
  }
};
