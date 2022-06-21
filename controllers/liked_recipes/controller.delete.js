const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { likedRecipesModel } = require("../../models");

exports.deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await likedRecipesModel.delete.deleteOneModel(id);
    res
      .status(200)
      .json(responseSuccess("Successfully deleted data.", results));
  } catch (err) {
    res.status(err.code).json(responseError(err.message));
  }
};
