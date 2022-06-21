const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { likedRecipesModel } = require("../../models");

exports.insertOne = async (req, res) => {
  try {
    const results = await likedRecipesModel.insert.insertOneModel(req.body);
    res.status(200).json(responseSuccess("Successfully added data.", results));
  } catch (err) {
    res.status(err.code).json(responseError(err.message));
  }
};
