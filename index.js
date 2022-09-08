const env = require("./libs/env");
const toBool = require("to-bool");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { handlingError } = require("./middlewares");
const db = require("./models");
const { transport } = require("./libs/emailServices");

const port = process.env.PORT || 8000;
const app = express();
const client = env.clientUrl.split(",");
const headers = ["Set-Cookie", "Cookie", "Content-Type"]

app.use(cors({ origin: client, allowedHeaders: headers, credentials: true }));
app.use(helmet());
app.use(xss());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./routes")(app);
app.use(handlingError);

app.listen(port, async () => {
	console.log(`\n> [Express]\t-> Server running successfully`);
	await db.sequelize
		.sync({ force: toBool(env.dbSync) })
		.then(() => console.log("> [Postgres]\t-> Connected to postgreSQL"))
		.catch((err) => {
			console.log("> [Postgres]\t\t-> Something went wrong!\n");
			console.log("!", err.message);
			process.exit(1);
		});
	await db.redis
		.connect()
		.then(() => console.log("> [Redis]\t-> Connected to redis"))
		.catch((err) => {
			console.log("> [Redis]\t-> Something went wrong!\n");
			console.log("!", err.message);
			process.exit(1);
		});
	await transport
		.verify()
		.then(() => console.log("> [SMTP]\t-> Connected to email server\n"))
		.catch((err) => {
			console.log("> [Redis]\t\t-> Something went wrong!\n");
			console.log("!", err.message);
			process.exit(1);
		});
});
