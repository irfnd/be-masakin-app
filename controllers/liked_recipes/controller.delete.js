const response = require("../../libs/responseFormat/response");
const { likedRecipesModel } = require("../../models");

exports.deleteOne = async (req, res) => {
  try {
    const results = await likedRecipesModel.delete.deleteOneModel(req.body);
    res.status(200).json(response(true, "Successfully deleted data.", results));
  } catch (err) {
    res
      .status(400)
      .json(response(false, "Something wrong!", null, err.message));
  }
};
