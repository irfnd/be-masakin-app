const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { savedRecipesModel } = require("../../models");

exports.deleteOne = async (req, res) => {
  try {
    const results = await savedRecipesModel.delete.deleteOneModel(req.body);
    res
      .status(200)
      .json(responseSuccess("Successfully deleted data.", results));
  } catch (err) {
    res.status(err.code).json(responseError(err.message));
  }
};
