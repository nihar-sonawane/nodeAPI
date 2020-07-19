const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbconnect");

const users = require("./routes/usersRoutes");
const cars = require("./routes/carsRoutes");

//dbConnect
connectDB();

//middleware
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

//routes
app.use("/users", users);
app.use("/cars", cars);

// app.get("/", (req, res, next) => {
//   res.status(200).json({
//     message: "Requested index page",
//   });
// });

//catch 404 error and forward them to error handler
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

//error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);

  //resposnd to clinent
  res.json({
    error: {
      message: "this is client side::: " + error.message,
    },
  });
});

module.exports = app;
