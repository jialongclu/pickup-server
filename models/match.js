const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  userOneId: String,
  userTwoId: String,
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
