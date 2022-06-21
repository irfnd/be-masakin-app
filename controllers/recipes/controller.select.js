const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { recipesModel } = require("../../models");

exports.selectAll = async (req, res) => {
  const { page, size } = req.query;
  try {
    const results = await recipesModel.select.selectAllModel(page, size);
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
      const results = await recipesModel.select.selectByIdModel(id);
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

exports.selectByOwner = async (req, res) => {
  const { id } = req.params;
  try {
    if (Number(id)) {
      const results = await recipesModel.select.selectByOwnerModel(id);
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

exports.selectByName = async (req, res) => {
  const { search } = req.body;
  try {
    const results = await recipesModel.select.selectByNameModel(search);
    res
      .status(200)
      .json(responseSuccess("Successfully retrieved data.", results));
  } catch (err) {
    res.status(err.code).json(responseError(err.message));
  }
};

exports.selectLatest = async (req, res) => {
  try {
    const results = await recipesModel.select.selectLatestModel();
    res
      .status(200)
      .json(responseSuccess("Successfully retrieved data.", results));
  } catch (err) {
    res.status(err.code).json(responseError(err.message));
  }
};
