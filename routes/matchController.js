var express = require("express");
var router = express.Router();

const { getMatches } = require("../database/services/matchService");

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  getMatches(id)
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
});

module.exports = router;
