const response = require("../../libs/responseFormat/response");
const { likedRecipesModel } = require("../../models");

exports.selectByUser = async (req, res) => {
  const { id_user } = req.params;
  try {
    if (Number(id_user)) {
      const results = await likedRecipesModel.select.selectByUserModel(id_user);
      if (results.length === 0) throw new Error("Data not found!");
      res
        .status(200)
        .json(response(true, "Successfully retrieved data.", results));
    } else {
      throw new Error("Parameter must be a number!");
    }
  } catch (err) {
    res
      .status(400)
      .json(response(false, "Something wrong!", null, err.message));
  }
};

exports.selectByRecipe = async (req, res) => {
  const { id_recipe } = req.params;
  try {
    if (Number(id_recipe)) {
      const results = await likedRecipesModel.select.selectByRecipeModel(
        id_recipe
      );
      if (results.length === 0) throw new Error("Data not found!");
      res
        .status(200)
        .json(response(true, "Successfully retrieved data.", results));
    } else {
      throw new Error("Parameter must be a number!");
    }
  } catch (err) {
    res
      .status(400)
      .json(response(false, "Something wrong!", null, err.message));
  }
};
