var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Midelware post to put
const methodOverride = require("method-override");
// exppress sesssion
const session = require("express-session");
// connect alert
const flash = require("connect-flash");

// router dashboard
const dashboardRouter = require("./dashboard/router");
const categoryRouter = require("./app/category/router");
const nominalRouter = require("./app/nominal/router");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// for use npm express-session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);
// for use npm express-flash
app.use(flash());
// Midelware post to put
app.use(methodOverride("_method"));
//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// use themplete engine
app.use(
  "/adminLte",
  express.static(path.join(__dirname, "node_modules/admin-lte"))
);

// dashboard
app.use("/", dashboardRouter);
app.use("/category", categoryRouter);
app.use("/nominal", nominalRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
