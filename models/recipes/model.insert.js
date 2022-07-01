const db = require("../connection");

const table = "recipes";
const sql = {
	insertOne: (data) => {
		const dataKeys = Object.keys(data).map((el) => el);
		const dataIndex = Object.keys(data).map((el, idx) => `$${idx + 1}`);
		return `INSERT INTO ${table} (${dataKeys}) VALUES (${dataIndex}) RETURNING *`;
	},
};

exports.insertOneModel = (data) => {
	const dataBody = {
		...data,
		ingredients: data.ingredients ? `{${data.ingredients.split("\n").map((el) => `"${el}"`)}}` : null,
		steps: data.steps ? `{${data.steps.split("\n").map((el) => `"${el}"`)}}` : null,
	};
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
