const db = require("../connection");

const table = "recipes";
const sql = {
  selectAll: `SELECT * FROM ${table} ORDER BY updated_at LIMIT $2 OFFSET (($1 - 1) * $2)`,
  selectById: `SELECT * FROM ${table} WHERE id = $1`,
  selectByOwner: `SELECT * FROM ${table} WHERE id_owner = $1`,
  selectByName: `SELECT * FROM ${table} WHERE LOWER(title) LIKE $1`,
};

exports.selectAllModel = (page, size) => {
  return new Promise((resolve, reject) => {
    db.query(sql.selectAll, [page, size], (err, result) => {
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

exports.selectByNameModel = (query) => {
  return new Promise((resolve, reject) => {
    db.query(sql.selectByName, [`%${query.toLowerCase()}%`], (err, result) => {
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
