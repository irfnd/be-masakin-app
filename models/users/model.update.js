const db = require("../connection");
const { encryptPassword } = require("../../libs/hashing/hashPassword");

const sql = {
	updateOne:
		"UPDATE users SET name = $1, email = $2, phone_number = $3, password = $4 WHERE id = $5",
};

exports.updateOneModel = (data, id) => {
	let hashedPassword = encryptPassword(data.password);
	return new Promise((resolve, reject) => {
		db.query(
			sql.updateOne,
			[data.name, data.email, data.phone_number, hashedPassword, id],
			(error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve({ request: { id, ...data } });
				}
			}
		);
	});
};
