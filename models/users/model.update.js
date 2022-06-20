const db = require("../connection");
const { encryptPassword } = require("../../libs/hashing/hashPassword");

const table = "users";
const sql = {
  updateOne: (data) => {
    let dataValues = Object.keys(data).map((el, idx) => `${el}=$${idx + 1}`);
    let lengthData = Object.keys(data).length + 1;
    return `UPDATE ${table} SET ${dataValues} WHERE id = $${lengthData} RETURNING *`;
  },
};

exports.updateOneModel = (data, id) => {
  let hashedPassword = encryptPassword(data.password);
  let dataBody = { ...data, password: hashedPassword };
  return new Promise((resolve, reject) => {
    db.query(
      sql.updateOne(dataBody),
      [...Object.values(dataBody), id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({ request: result.rows });
        }
      }
    );
  });
};
