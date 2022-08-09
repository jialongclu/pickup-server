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

  // const currentMatches = await Match.find({ userOneId: userId });

  let userProfiles = [];
  for (const currentMatch of newMatches) {
    userProfiles.push(await User.find({ _id: currentMatch.userTwoId }));
  }
  for (const currentMatch of potentialMatches) {
    userProfiles.push(await User.find({ _id: currentMatch.userTwoId }));
  }
  return userProfiles;
}

module.exports = {
  getMatches,
};
