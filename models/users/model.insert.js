const db = require("../connection");
const { encryptPassword } = require("../../libs/hashing/hashPassword");

const table = "users";
const sql = {
  insertOne: (data) => {
    let dataKeys = Object.keys(data).map((el) => el);
    let dataIndex = Object.keys(data).map((el, idx) => `$${idx + 1}`);
    return `INSERT INTO ${table} (${dataKeys}) VALUES (${dataIndex}) RETURNING *`;
  },
};

exports.insertOneModel = (data) => {
  let hashedPassword = encryptPassword(data.password);
  let dataBody = { ...data, password: hashedPassword };
  return new Promise((resolve, reject) => {
    db.query(
      sql.insertOne(dataBody),
      Object.values(dataBody),
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ request: result.rows });
        }
      }
    );
  });
};
