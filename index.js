require("dotenv").config();
const { SERVER_HOST, SERVER_PORT } = process.env;

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { handlingError } = require("./middlewares");

const app = express();

app.use(cors({ origin: "https://www.youtube.com" }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./routes")(app);
app.use(handlingError);

app.listen(SERVER_PORT, () => {
	console.log(`> Server running on http://${SERVER_HOST}:${SERVER_PORT}`);
});
