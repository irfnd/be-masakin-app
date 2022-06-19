require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes")(app);

app.listen(process.env.SERVER_PORT, () => {
	console.log(
		`> Server running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
	);
});
