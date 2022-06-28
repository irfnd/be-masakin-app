const db = require("../connection");
const { encryptPassword } = require("../../libs/hashing/hashPassword");

const table = "users";
const sql = {
	updateOne: (data) => {
		const dataValues = Object.keys(data).map((el, idx) => `${el}=$${idx + 1}`);
		const lengthData = Object.keys(data).length + 1;
		return `UPDATE ${table} SET ${dataValues} WHERE id = $${lengthData} RETURNING *`;
	},
};

exports.updateOneModel = (data, id) => {
	const hashedPassword = encryptPassword(data.password);
	const dataBody = { ...data, password: hashedPassword };
	return new Promise((resolve, reject) => {
		db.query(sql.updateOne(dataBody), [...Object.values(dataBody), id], (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				if (result.rowCount === 0) {
					reject(
						new Error(JSON.stringify({ code: 400, message: "Failed to update, data not found!" }))
					);
				}
				resolve({ request: result.rows });
			}
		});
	});
};
