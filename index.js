require("dotenv").config();
const { ENV, CLIENT_HOST, CLIENT_LOCAL_URL, DATABASE_SYNC } = process.env;

const toBool = require("to-bool");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { handlingError } = require("./middlewares");
const db = require("./models");

const port = process.env.PORT || 8000;
const app = express();
const client = ENV === "production" ? CLIENT_HOST : CLIENT_LOCAL_URL;

app.use(cors({ origin: client }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./routes")(app);
app.use(handlingError);

app.listen(port, () => {
	console.log(`\n> [Express]\t\t- Server running successfully`);
	db.sequelize
		.sync({ force: toBool(DATABASE_SYNC) })
		.then(() => console.log("> [Postgres]\t\t- Connected to database"))
		.catch((err) => {
			console.log("> [Postgres]\t\t- Something went wrong!\n");
			console.log("!", err.message);
			process.exit(1);
		});
	db.redis
		.connect()
		.then(() => console.log("> [Redis]\t\t- Connected to redis"))
		.catch((err) => {
			console.log("> [Redis]\t\t- Something went wrong!\n");
			console.log("!", err.message);
			process.exit(1);
		});
});
