const User = require("../models/User");
const express = require("express");
const router = express.Router();

router.get("/getallcoldstorages", (req, res) => {
  User.find({category:"coldstorage"}, (err, users) => {
    var userMap = [];

    users.forEach((user) => {
      userMap.push({
        id: user._id,
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        cold_storage_name: user.cold_storage_name,
        cold_storage_license_no: user.cold_storage_license_no,
        category: user.category
      });
    });
    res.status(200).send({
      success:true,
      result:userMap
    });
  });
});

module.exports = router;
