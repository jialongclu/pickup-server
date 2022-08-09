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

  const sanitizedUsers = users.filter((user) => {
    if (interactions.length === 0) {
      return user === user;
    }
    for (const interaction of interactions) {
      return (
        interaction.userOneId !== user._id.toString() &&
        interaction.userOneId !== id
      );
    }
  });

  res.send(sanitizedUsers);
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
