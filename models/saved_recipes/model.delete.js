const db = require("../connection");

const table = "saved_recipes";
const sql = {
	deleteOne: `DELETE FROM ${table} WHERE id_user = $1 AND id_recipe = $2 RETURNING *`,
};

exports.deleteOneModel = (data) => {
	return new Promise((resolve, reject) => {
		db.query(sql.deleteOne, [data], (err, result) => {
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
