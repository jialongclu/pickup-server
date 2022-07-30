var express = require('express');
var router = express.Router();
const { getUsers, editUserProfile, getUserProfile } = require('../database/index.js')

/* GET users listing. */
router.get('/', function (req, res, next) {
  getUsers().then((resp) => res.send(resp))
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  getUserProfile(id).then((resp) => res.send(resp));
});

router.patch('/:id', function (req, res, next) {
  const { id } = req.params;
  const updatedFields = req.body;
  editUserProfile({ id, updatedFields }).then((resp) => res.send(resp));
});

module.exports = router;
