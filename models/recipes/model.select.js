const db = require("../connection");

const table = "recipes";
const sql = {
  selectAll: `SELECT * FROM ${table}`,
  selectById: `SELECT * FROM ${table} WHERE id = $1`,
  selectByOwner: `SELECT * FROM ${table} WHERE id_owner = $1`,
};

exports.selectAllModel = () => {
  return new Promise((resolve, reject) => {
    db.query(sql.selectAll, (err, result) => {
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

exports.selectByOwnerModel = (id_owner) => {
  return new Promise((resolve, reject) => {
    db.query(sql.selectByOwner, [id_owner], (err, result) => {
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
