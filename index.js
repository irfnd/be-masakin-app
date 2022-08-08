require("dotenv").config();
const { ENV, CLIENT_HOST, CLIENT_HOST_LOCAL, DB_SYNC } = process.env;

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { handlingError } = require("./middlewares");
const db = require("./models");

const port = process.env.PORT || 8000;
const app = express();
const client = ENV === "production" ? CLIENT_HOST : CLIENT_HOST_LOCAL;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./routes")(app);
app.use(handlingError);

app.listen(port, () => {
	console.log(`> Server running successfully`);
	db.sequelize
		.sync({ force: DB_SYNC })
		.then(() => console.log("> Connected to database\n"))
		.catch((err) => {
			console.log("> Something went wrong!", err.message);
			process.exit(1);
		});
});
