require("dotenv").config();
const { DATABASE_URL } = process.env;

const { Pool } = require("pg");

const db = new Pool({
	connectionString: DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

db.on("error", (err) => {
	console.error("> Unexpected error on idle client!\n", err);
	process.exit(-1);
});

db.connect((err) => {
	try {
		if (err) throw err;
		console.log("> Connected to database.\n");
	} catch (error) {
		console.error("> Failed to connect to database!");
		console.log(err.message, "\n");
		process.exit(-1);
	}
});

module.exports = db;
