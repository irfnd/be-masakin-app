const sql = {
	insertOne: (dataBody) => {
		let keys = Object.keys(dataBody).map((el) => el);
		let index = Object.keys(dataBody).map((el, idx) => `$${idx + 1}`);
		return `INSERT INTO users (${keys}) VALUES (${index}) RETURNING *`;
	},
};

const dataBody = {
	title: "Resep Laksa Udang, Sebuah Sajian Spesial untuk Keluarga Tercinta",
	ingredients:
		"400 g udang ukuran sedang\n5 sdm minyak, untuk menumis\n10 lembar daun jeruk, iris tipis",
	photo_recipe:
		"https://www.masakapahariini.com/wp-content/uploads/2020/10/laksa-udang-780x440.jpg",
	id_owner: 1,
};

const dataNew = {
	...dataBody,
	ingredients: `{${dataBody.ingredients.split("\n").map((el) => `"${el}"`)}}`,
};

console.log(sql.insertOne(dataNew), Object.values(dataNew));
