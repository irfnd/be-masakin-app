const db = require("../connection");

const table = "users";
const sql = {
  selectAll: `SELECT * FROM ${table}`,
  selectById: `SELECT * FROM ${table} WHERE id = $1`,
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
