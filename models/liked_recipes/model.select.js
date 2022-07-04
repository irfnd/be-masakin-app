const db = require("../connection");

const table = "liked_recipes";
const sql = {
	selectByUser: `
		SELECT * FROM ${table}
		INNER JOIN recipes
		ON ${table}.id_recipe = recipes.id
		WHERE ${table}.id_user = $1
	`,
	selectByRecipe: `
		SELECT * FROM ${table}
		INNER JOIN users
		ON ${table}.id_user = users.id	
		WHERE ${table}.id_recipe = $1
	`,
};

exports.selectByUserModel = (id_user) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectByUser, [id_user], (err, result) => {
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

exports.selectByRecipeModel = (id_recipe) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectByRecipe, [id_recipe], (err, result) => {
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
