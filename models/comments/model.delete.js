const db = require("../connection");

const table = "comments";
const sql = {
	deleteOne: `DELETE FROM ${table} WHERE id = $1 RETURNING *`,
};

exports.deleteOneModel = (id) => {
	return new Promise((resolve, reject) => {
		db.query(sql.deleteOne, [id], (err, result) => {
			try {
				if (err) throw new Error(JSON.stringify({ code: 500, message: err.message }));
				if (result.rowCount === 0)
					throw new Error(JSON.stringify({ code: 400, message: "Failed to delete, data not found!" }));
				resolve({ request: result.rows });
			} catch (error) {
				reject(error.message);
			}
		});
	});
};
