const Match = require("../models/match");
const Interaction = require("../models/interaction");
const User = require("../models/user");

async function getMatches(userId) {
  const usersLiked = await Interaction.find({
    userOneId: userId,
    swiped: true,
  });

  const usersLikedBy = await Interaction.find({
    userTwoId: userId,
    swiped: true,
  });
  const previousMatches = await Match.find({ userOneId: userId });
  let potentialMatches = [];
  let newMatches = [];

  for (const userLiked of usersLiked) {
    for (const userLikedBy of usersLikedBy) {
      if (
        userLiked.userOneId === userLikedBy.userTwoId &&
        userLiked.userTwoId === userLikedBy.userOneId
      ) {
        potentialMatches.push({
          userOneId: userId,
          userTwoId: userLikedBy.userOneId,
        });
      }
    }
  }

  newMatches = potentialMatches.filter((potentialMatch) => {
    if (previousMatches.length === 0) {
      return potentialMatch === potentialMatch;
    }
    for (const previousMatch of previousMatches) {
      return previousMatch.userOneId !== potentialMatch.userOneId;
    }
  });

  for (const newMatch of newMatches) {
    const newMatchCreated = new Match({
      userOneId: userId,
      userTwoId: newMatch.userTwoId,
    });

    newMatchCreated.save();
  }

  const currentMatches = await Match.find({ userOneId: userId });
  const otherMatches = await Match.find({ twoUserId: userId });

  let current = []
  for (const currentMatch of potentialMatches) {
    const resp = await User.find({ _id: currentMatch.userTwoId });
    current.push(...resp)
  }

  for (const currentMatch of newMatches) {
    const resp = await User.find({ _id: currentMatch.userTwoId });
    current.push(...resp)
  }

  const removeDups = new Set();
  current = current.filter((user) => {
    if (removeDups.has(user._id.toString())) {
      return false;
    }
    removeDups.add(user._id.toString());
    return true;
  })

  return current;
}

module.exports = {
  getMatches,
};
