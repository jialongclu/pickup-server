const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const indexController = require("./controllers/indexController");
const usersController = require("./controllers/userController");
const signUpController = require("./controllers/signUpController");
const signInController = require("./controllers/signInController");
const interactionController = require("./controllers/interactionController");
const matchController = require("./controllers/matchController");

const populateDatabase = require("./utils/generate-data");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(cookieParser());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", indexController);
app.use("/users", usersController);
app.use("/signUp", signUpController);
app.use("/signIn", signInController);
app.use("/interaction", interactionController);
app.use("/match", matchController);

async function main() {
  await mongoose.connect(
    `mongodb+srv://Pickup:A81tDdYoW2TOTRRs@pickup.2qdtldr.mongodb.net/?retryWrites=true&w=majority`
  );
  // await populateDatabase();
}

main().catch((err) => console.log(err));

module.exports = app;
