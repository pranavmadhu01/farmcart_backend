const express = require("express");
const router = express.Router();

const { message, messageget } = require("../controllers/userfeed");
router.post("/feedsend", message);
router.get("/feedrecieve", messageget);

module.exports = router;
