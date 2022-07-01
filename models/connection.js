require("dotenv").config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

const { Pool } = require("pg");

const db = new Pool({
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	password: DB_PASS,
	database: DB_NAME,
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
