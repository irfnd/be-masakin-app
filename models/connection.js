/* eslint-disable no-undef */
require("dotenv").config();
const { Pool } = require("pg");

const db = new Pool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

db.on("error", (err) => {
	console.error("> Unexpected error on idle client.\n", err);
	process.exit(-1);
});

db.connect((err) => {
	try {
		if (err) throw err;
		console.log("> Connected to database.\n");
	} catch (err) {
		console.error("> Failed to connect to database.\n", err);
		process.exit(-1);
	}
});

module.exports = db;
