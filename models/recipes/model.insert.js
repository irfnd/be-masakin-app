const db = require("../connection");

const sql = {
	insertOne: (data) => {
		let dataKeys = Object.keys(data).map((el) => el);
		let dataIndex = Object.keys(data).map((el, idx) => `$${idx + 1}`);
		return `INSERT INTO recipes (${dataKeys}) VALUES (${dataIndex}) RETURNING *`;
	},
};

exports.insertOneModel = (data) => {
	let dataBody = {
		...data,
		ingredients:
			data.ingredients !== null
				? `{${data.ingredients.split("\n").map((el) => `"${el}"`)}}`
				: null,
	};
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