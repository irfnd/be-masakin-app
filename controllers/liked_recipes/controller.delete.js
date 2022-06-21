const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { likedRecipesModel } = require("../../models");

exports.deleteOne = async (req, res) => {
  try {
    const results = await likedRecipesModel.delete.deleteOneModel(req.body);
    res
      .status(200)
      .json(responseSuccess("Successfully deleted data.", results));
  } catch (err) {
    res.status(err.code).json(responseError(err.message));
  }
};
