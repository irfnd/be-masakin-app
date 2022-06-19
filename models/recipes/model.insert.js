const db = require("../connection");
const { encryptPassword } = require("../../libs/hashing/hashPassword");

const sql = {
	insertOne:
		"INSERT INTO users (name, email, phone_number, password) values ($1, $2, $3, $4)",
};

exports.insertOneModel = (data) => {
	let hashedPassword = encryptPassword(data.password);
	return new Promise((resolve, reject) => {
		db.query(
			sql.insertOne,
			[data.name, data.email, data.phone_number, hashedPassword],
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve({ request: data });
				}
			}
		);
	});
};
