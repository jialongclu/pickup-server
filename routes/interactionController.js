var express = require("express");
var router = express.Router();

const {
  createInteraction,
  getInteractions,
} = require("../database/services/interactionService");

router.post("/", function (req, res, next) {
  const { userIdOne, userIdTwo, swiped } = req.body;
  createInteraction(userIdOne, userIdTwo, swiped)
    .then((resp) => res.sendStatus(200))
    .catch((err) => res.send(err));
});

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  getInteractions(id)
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
});
module.exports = router;
