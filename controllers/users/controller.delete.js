const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { usersModel } = require("../../models");

exports.deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    if (Number(id)) {
      const results = await usersModel.delete.deleteOneModel(id);
      res
        .status(200)
        .json(responseSuccess("Successfully deleted data.", results));
    } else {
      throw { code: 400, message: "Parameter must be a number!" };
    }
  } catch (err) {
    res.status(err.code).json(responseError(err.message));
  }
};
