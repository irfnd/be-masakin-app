const db = require("../connection");

const table = "liked_recipes";
const sql = {
  deleteOne: `DELETE FROM ${table} WHERE id_user = $1 AND id_recipe = $2 RETURNING *`,
};

exports.deleteOneModel = (data) => {
  return new Promise((resolve, reject) => {
    db.query(sql.deleteOne, [data], (err, result) => {
      if (err) {
        reject({ code: 500, message: err.message });
      } else {
        if (result.rowCount === 0) {
          reject({
            code: 400,
            message: "Failed to delete, data not found!",
          });
        }
        resolve({ request: result.rows });
      }
    });
  });
};
