const db = require("../connection");

const table = "comments";
const sql = {
  selectAll: `SELECT * FROM ${table}`,
  selectById: `SELECT * FROM ${table} WHERE id = $1`,
  selectByRecipe: `SELECT * FROM ${table} WHERE id_recipe = $1`,
};

exports.selectAllModel = () => {
  return new Promise((resolve, reject) => {
    db.query(sql.selectAll, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

exports.selectByIdModel = (id) => {
  return new Promise((resolve, reject) => {
    db.query(sql.selectById, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

exports.selectByRecipeModel = (id_recipe) => {
  return new Promise((resolve, reject) => {
    db.query(sql.selectByRecipe, [id_recipe], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};
