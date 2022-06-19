const db = require("../connection");

const sql = {
	selectAll: "SELECT * FROM users",
	selectById: "SELECT * FROM users WHERE id = $1",
};

exports.selectAllModel = () => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectAll, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result.rows);
			}
		});
	});
};

exports.selectByIdModel = (id) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectById, [id], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result.rows);
			}
		});
	});
};
