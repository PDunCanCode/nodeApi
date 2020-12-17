const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

//Load env variables
dotenv.config({ path: "./config/config.env" });

connectDB();

// Route Files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = rewuire("./routes/reviews");

const app = express();

app.use(express.json());

// Cookie Parser
app.use(cookieParser());

//Dev logging middlewar
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Sanitize Data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent Cross Sire Scripting Attacks
app.use(xss());

// Rate Limitiing
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10mins
  max: 100,
});

app.use(limiter);

// Prevent HTTP param pollution

app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

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
