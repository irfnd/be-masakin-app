const db = require("../connection");

const sql = {
	deleteOne: "DELETE FROM users WHERE id = $1",
};

exports.deleteOneModel = (id) => {
	return new Promise((resolve, reject) => {
		db.query(sql.deleteOne, [id], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve({ request: id });
			}
		});
	});
};
