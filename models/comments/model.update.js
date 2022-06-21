const db = require("../connection");

const table = "comments";
const sql = {
  updateOne: (data) => {
    let dataValues = Object.keys(data).map((el, idx) => `${el}=$${idx + 1}`);
    let lengthData = Object.keys(data).length + 1;
    return `UPDATE ${table} SET ${dataValues} WHERE id = $${lengthData} RETURNING *`;
  },
};

exports.updateOneModel = (data, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      sql.updateOne(data),
      [...Object.values(data), id],
      (err, result) => {
        if (err) {
          reject({ code: 500, message: err.message });
        } else {
          if (result.rowCount === 0) {
            reject({
              code: 400,
              message: "Failed to update, user not found!",
            });
          }
          resolve({ request: result.rows });
        }
      }
    );
  });
};
