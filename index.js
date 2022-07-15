require("dotenv").config();
const { MODE, CLIENT_HOST, CLIENT_HOST_LOCAL } = process.env;

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { handlingError } = require("./middlewares");

const port = process.env.PORT || 8000;
const app = express();
const client = MODE === "production" ? CLIENT_HOST : CLIENT_HOST_LOCAL;

app.use(cors({ origin: client }));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./routes")(app);
app.use(handlingError);

app.listen(port, () => {
	console.log(`> Server running successfully`);
});
