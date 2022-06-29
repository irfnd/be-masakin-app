const { hashSync } = require("bcrypt");
const db = require("../connection");

const table = "users";
const sql = {
	insertOne: (data) => {
		const dataKeys = Object.keys(data).map((el) => el);
		const dataIndex = Object.keys(data).map((el, idx) => `$${idx + 1}`);
		return `INSERT INTO ${table} (${dataKeys}) VALUES (${dataIndex}) RETURNING *`;
	},
};

exports.insertOneModel = (data) => {
	const dataBody = { ...data, password: hashSync(data.password, 10) };
	return new Promise((resolve, reject) => {
		db.query(sql.insertOne(dataBody), Object.values(dataBody), (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				resolve({ request: result.rows });
			}
		});
	});
};
