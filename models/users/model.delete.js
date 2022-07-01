const db = require("../connection");

const table = "users";
const sql = {
	deleteOne: `DELETE FROM ${table} WHERE id = $1 RETURNING *`,
};

exports.deleteOneModel = (id) => {
	return new Promise((resolve, reject) => {
		db.query(sql.deleteOne, [id], (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				if (result.rowCount === 0) {
					reject(new Error(JSON.stringify({ code: 400, message: "Failed to delete, data not found!" })));
				}
				resolve({ request: result.rows });
			}
		});
	});
};
