const db = require("../connection");

const table = "tokens";
const sql = {
	selectByToken: `SELECT * FROM ${table} WHERE refresh_token = $1`,
};

exports.selectByTokenModel = (refreshToken) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectByToken, [refreshToken], (err, result) => {
			try {
				if (err) throw new Error(JSON.stringify({ code: 500, message: err.message }));
				resolve(result.rows);
			} catch (error) {
				reject(error.message);
			}
		});
	});
};
