const express = require("express");
const router = express.Router();

const { message } = require("../controllers/userfeed");
router.post("/feedsend", message);


module.exports = router;