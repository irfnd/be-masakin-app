const db = require("../connection");

const table = "recipes_videos";
const sql = {
  selectById: `SELECT * FROM ${table} WHERE id = $1`,
  selectByRecipe: `SELECT * FROM ${table} WHERE id_recipe = $1`,
};

exports.selectByIdModel = (id) => {
  return new Promise((resolve, reject) => {
    db.query(sql.selectById, [id], (err, result) => {
      if (err) {
        reject({ code: 500, message: err.message });
      } else {
        if (result.rowCount === 0) {
          reject({
            code: 404,
            message: "Data not found!",
          });
        }
        resolve(result.rows);
      }
    });
  });
};

exports.selectByRecipeModel = (id_recipe) => {
  return new Promise((resolve, reject) => {
    db.query(sql.selectById, [id_recipe], (err, result) => {
      if (err) {
        reject({ code: 500, message: err.message });
      } else {
        if (result.rowCount === 0) {
          reject({
            code: 404,
            message: "Data not found!",
          });
        }
        resolve(result.rows);
      }
    });
  });
};
