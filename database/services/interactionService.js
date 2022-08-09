const Interaction = require("../models/interaction");

async function createInteraction(userOneId, userTwoId, swiped) {
  const newInteraction = new Interaction({
    userOneId: userOneId,
    userTwoId: userTwoId,
    swiped: swiped,
  });
  newInteraction.save();
}

async function getInteractions(id) {
  const interactions = await Interaction.find({
    userOneId: id,
  });
  return interactions;
}

module.exports = {
  createInteraction,
  getInteractions,
};
