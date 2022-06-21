const db = require("../connection");

const table = "recipes";
const sql = {
  insertOne: (data) => {
    let dataKeys = Object.keys(data).map((el) => el);
    let dataIndex = Object.keys(data).map((el, idx) => `$${idx + 1}`);
    return `INSERT INTO ${table} (${dataKeys}) VALUES (${dataIndex}) RETURNING *`;
  },
};

exports.insertOneModel = (data) => {
  let dataBody = {
    ...data,
    ingredients: data.ingredients
      ? `{${data.ingredients.split("\n").map((el) => `"${el}"`)}}`
      : null,
    steps: data.steps
      ? `{${data.steps.split("\n").map((el) => `"${el}"`)}}`
      : null,
  };
  return new Promise((resolve, reject) => {
    db.query(
      sql.insertOne(dataBody),
      Object.values(dataBody),
      (err, result) => {
        if (err) {
          reject({ code: 500, message: err.message });
        } else {
          resolve({ request: result.rows });
        }
      }
    );
  });
};
