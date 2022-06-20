const db = require("../connection");

const sql = {
	updateOne: (data) => {
		let dataValues = Object.keys(data).map((el, idx) => `${el}=$${idx + 1}`);
		let lengthData = Object.keys(data).length + 1;
		return `UPDATE comments SET ${dataValues} WHERE id = $${lengthData} RETURNING *`;
	},
};

exports.updateOneModel = (data, id) => {
	return new Promise((resolve, reject) => {
		db.query(
			sql.updateOne(data),
			[...Object.values(data), id],
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
