const db = require("../connection");

const table = "recipes";
const sql = {
  deleteOne: `DELETE FROM ${table} WHERE id = $1 RETURNING *`,
};

exports.deleteOneModel = (id) => {
  return new Promise((resolve, reject) => {
    db.query(sql.deleteOne, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ request: result.rows });
      }
    });
  });
};
