const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

//Load env variables
dotenv.config({ path: "./config/config.env" });

connectDB();

const bootcamps = require("./routes/bootcamps");

const app = express();

//Dev logging middlewar
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `ServerRunning in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled rejection: ${err.message}`.red);
  //Close Server exit Process
  server.close(() => process.exit(1));
});
