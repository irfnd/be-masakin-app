const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { commentsModel } = require("../../models");

exports.selectAll = async (req, res) => {
  try {
    const results = await commentsModel.select.selectAllModel();
    res
      .status(200)
      .json(responseSuccess("Successfully retrieved data.", results));
  } catch (err) {
    res.status(err.code).json(responseError(err.message));
  }
};

exports.selectById = async (req, res) => {
  const { id } = req.params;
  try {
    if (Number(id)) {
      const results = await commentsModel.select.selectByIdModel(id);
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
      const results = await commentsModel.select.selectByRecipeModel(id);
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
