const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { recipesModel } = require("../../models");

exports.updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    if (Number(id)) {
      const results = await recipesModel.update.updateOneModel(req.body, id);
      res
        .status(200)
        .json(responseSuccess("Successfully updated data.", results));
    } else {
      throw { code: 400, message: "Parameter must be a number!" };
    }
  } catch (err) {
    res.status(err.code).json(responseError(err.message));
  }
};
