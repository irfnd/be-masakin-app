const db = require("../connection");

const table = "liked_recipes";
const sql = {
	insertOne: (data) => {
		const dataKeys = Object.keys(data).map((el) => el);
		const dataIndex = Object.keys(data).map((el, idx) => `$${idx + 1}`);
		return `INSERT INTO ${table} (${dataKeys}) VALUES (${dataIndex}) RETURNING *`;
	},
};

exports.insertOneModel = (data) => {
	return new Promise((resolve, reject) => {
		db.query(sql.insertOne(data), Object.values(data), (err, result) => {
			try {
				if (err) throw new Error(JSON.stringify({ code: 500, message: err.message }));
				resolve({ request: result.rows });
			} catch (error) {
				reject(error.message);
			}
		});
	});
};
