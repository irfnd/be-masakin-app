const db = require("../connection");

const sql = {
	updateOne: (data) => {
		let dataValues = Object.keys(data).map((el, idx) => `${el}=$${idx + 1}`);
		let lengthData = Object.keys(data).length + 1;
		return `UPDATE recipes SET ${dataValues} WHERE id = $${lengthData} RETURNING *`;
	},
};

exports.updateOneModel = (data, id) => {
	let dataBody = {
		...data,
		ingredients:
			data.ingredients !== null
				? `{${data.ingredients.split("\n").map((el) => `"${el}"`)}}`
				: null,
	};
	return new Promise((resolve, reject) => {
		db.query(
			sql.updateOne(dataBody),
			[...Object.values(dataBody), id],
			(error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve({ request: result.rows });
				}
			}
		);
	});
};
