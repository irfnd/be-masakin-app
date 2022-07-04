const db = require("../connection");

const table = "users";
const sql = {
	selectAll: `SELECT * FROM ${table}`,
	selectById: `SELECT * FROM ${table} WHERE id = $1`,
	selectByEmail: `SELECT * FROM ${table} WHERE email = $1`,
};

exports.selectAllModel = () => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectAll, (err, result) => {
			try {
				if (err) throw new Error(JSON.stringify({ code: 500, message: err.message }));
				if (result.rowCount === 0) throw new Error(JSON.stringify({ code: 404, message: "Data not found!" }));
				resolve(result.rows);
			} catch (error) {
				reject(error.message);
			}
		});
	});
};

exports.selectByIdModel = (id) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectById, [id], (err, result) => {
			try {
				if (err) throw new Error(JSON.stringify({ code: 500, message: err.message }));
				if (result.rowCount === 0) throw new Error(JSON.stringify({ code: 404, message: "Data not found!" }));
				resolve(result.rows);
			} catch (error) {
				reject(error.message);
			}
		});
	});
};

exports.selectByEmailModel = (email) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectByEmail, [email], (err, result) => {
			try {
				if (err) throw new Error(JSON.stringify({ code: 500, message: err.message }));
				resolve(result.rows);
			} catch (error) {
				reject(error.message);
			}
		});
	});
};
