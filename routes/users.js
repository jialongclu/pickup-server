var express = require("express");
var router = express.Router();
const {
  getUsers,
  editUserProfile,
  getUserProfile,
} = require("../database/index.js");
const {
  getInteractions,
} = require("../database/services/interactionService.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
  getUsers().then((resp) => res.send(resp));
});

router.get("/discover/:id", async function (req, res, next) {
  const { id } = req.params;
  let users = await getUsers();
  let interactions = await getInteractions(id);
  let userList = [];
  console.log(interactions);

  // const sanitizedUsers = users.filter((user) => {
  //   if (interactions.length === 0) {
  //     return user === user;
  //   }
  //   for (const interaction of interactions) {
  //     console.log(interaction.userTwoId, user._id.toString(), id);
  //     return (
  //       interaction.userTwoId !== user._id.toString() &&
  //       user._id.toString() !== id
  //     );
  //   }
  // });

  for (const user of users) {
    for (const interaction of interactions) {
      console.log(user._id.toString(), interaction.userTwoId);
      if (
        user._id.toString() !== id &&
        user._id.toString() !== interaction.userTwoId
      ) {
        userList.push(user);
      }
    }
  }
  // console.log(userList);

  res.send(userList);
});

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  getUserProfile(id).then((resp) => res.send(resp));
});

router.patch("/:id", function (req, res, next) {
  const { id } = req.params;
  const updatedFields = req.body;
  editUserProfile({ id, updatedFields }).then((resp) => res.send(resp));
});

module.exports = router;
