var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var signUpRouter = require("./routes/signUp");
var signInRouter = require("./routes/signIn");
const interactionController = require("./routes/interactionController");
const matchController = require("./routes/matchController");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/signUp", signUpRouter);
app.use("/signIn", signInRouter);
app.use("/interaction", interactionController);
app.use("/match", matchController);

module.exports = app;
