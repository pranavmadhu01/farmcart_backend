const User = require("../models/User");
const express = require("express");
const router = express.Router();

router.get("/getallfarmers", (req, res) => {
  User.find({category:"farmer"}, (err, users) => {
    var userMap = {};

    users.forEach((user) => {
      userMap[user._id] = user;
    });
    res.status(200).send(userMap);
  });
});

module.exports = router;