var express = require("express");
var router = express.Router();
const {
  getUsers,
  editUserProfile,
  getUserProfile,
} = require("../services/userService.js");
const { getInteractions } = require("../services/interactionService.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
  getUsers().then((resp) => res.send(resp));
});

router.get("/discover/:id", async function (req, res, next) {
  const { id } = req.params;
  let users = await getUsers();
  let interactions = await getInteractions(id);
  let userList = [];
  const removeUsers = new Set();

  for (const user of users) {
    for (const interaction of interactions) {
      if (
        user._id.toString() === id ||
        user._id.toString() === interaction.userTwoId
      ) {
        removeUsers.add(user._id);
      }
    }
  }

  for (const user of users) {
    if (!removeUsers.has(user._id) && !(user._id.toString() === id)) {
      userList.push(user);
    }
  }
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
