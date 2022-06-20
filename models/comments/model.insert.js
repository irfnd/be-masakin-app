const db = require("../connection");

const sql = {
	insertOne: (data) => {
		let dataKeys = Object.keys(data).map((el) => el);
		let dataIndex = Object.keys(data).map((el, idx) => `$${idx + 1}`);
		return `INSERT INTO comments (${dataKeys}) VALUES (${dataIndex}) RETURNING *`;
	},
};

exports.insertOneModel = (data) => {
	return new Promise((resolve, reject) => {
		db.query(sql.insertOne(data), Object.values(data), (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve({ request: result.rows });
			}
		});
	});
};
