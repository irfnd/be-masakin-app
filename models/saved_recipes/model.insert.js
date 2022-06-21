const db = require("../connection");

const table = "saved_recipes";
const sql = {
  insertOne: (data) => {
    let dataKeys = Object.keys(data).map((el) => el);
    let dataIndex = Object.keys(data).map((el, idx) => `$${idx + 1}`);
    return `INSERT INTO ${table} (${dataKeys}) VALUES (${dataIndex}) RETURNING *`;
  },
};

exports.insertOneModel = (data) => {
  return new Promise((resolve, reject) => {
    db.query(sql.insertOne(data), Object.values(data), (err, result) => {
      if (err) {
        reject({ code: 500, message: err.message });
      } else {
        resolve({ request: result.rows });
      }
    });
  });
};