const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const bootcamps = require("./routes/bootcamps");
//Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

//Dev logging middlewar
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`ServerRunning in ${process.env.NODE_ENV} mode on ${PORT}`)
);
