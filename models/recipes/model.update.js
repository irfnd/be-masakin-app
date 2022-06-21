const db = require("../connection");

const table = "recipes";
const sql = {
  updateOne: (data) => {
    let dataValues = Object.keys(data).map((el, idx) => `${el}=$${idx + 1}`);
    let lengthData = Object.keys(data).length + 1;
    return `UPDATE ${table} SET ${dataValues} WHERE id = $${lengthData} RETURNING *`;
  },
};

exports.updateOneModel = (data, id) => {
  let dataBody = {
    ...data,
    ingredients:
      data.ingredients !== null
        ? `{${data.ingredients.split("\n").map((el) => `"${el}"`)}}`
        : null,
  };
  return new Promise((resolve, reject) => {
    db.query(
      sql.updateOne(dataBody),
      [...Object.values(dataBody), id],
      (err, result) => {
        if (err) {
          reject({ code: 500, message: err.message });
        } else {
          if (result.rowCount === 0) {
            reject({
              code: 400,
              message: "Failed to update, data not found!",
            });
          }
          resolve({ request: result.rows });
        }
      }
    );
  });
};
