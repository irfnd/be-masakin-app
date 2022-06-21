require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(helmet());
// app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./routes")(app);

// eslint-disable-next-line no-undef
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    // eslint-disable-next-line no-undef
    `> Server running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
  );
});
