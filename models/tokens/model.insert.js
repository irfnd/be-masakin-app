const db = require("../connection");

const table = "tokens";
const sql = {
	insertOne: (data) => {
		const dataKeys = Object.keys(data).map((el) => el);
		const dataIndex = Object.keys(data).map((el, idx) => `$${idx + 1}`);
		return `INSERT INTO ${table} (${dataKeys}) VALUES (${dataIndex})`;
	},
};

exports.insertOneModel = (data) => {
	return new Promise((resolve, reject) => {
		db.query(sql.insertOne(data), Object.values(data), (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				resolve(result.rows);
			}
		});
	});
};
