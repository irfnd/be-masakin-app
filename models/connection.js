require("dotenv").config();
const { DATABASE_URL, DATABASE_URL_LOCAL, MODE } = process.env;

const { Pool, Client } = require("pg");
let db;

if (MODE === "production") {
	db = new Client({
		connectionString: DATABASE_URL,
		ssl: { rejectUnauthorized: false },
	});
} else {
	db = new Pool({
		connectionString: DATABASE_URL_LOCAL,
	});
}

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
