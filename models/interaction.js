const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
  userOneId: String,
  userTwoId: String,
  swiped: Boolean,
});

const Interaction = mongoose.model("Interaction", interactionSchema);

module.exports = Interaction;
