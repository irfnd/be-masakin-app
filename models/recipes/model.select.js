const db = require("../connection");

const sql = {
	selectAll: "SELECT * FROM recipes",
	selectById: "SELECT * FROM recipes WHERE id = $1",
	selectByOwner: "SELECT * FROM recipes WHERE id_owner = $1",
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

exports.selectByOwnerModel = (id_owner) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectByOwner, [id_owner], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result.rows);
			}
		});
	});
};
