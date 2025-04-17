
const express = require("express");
const router = express.Router();
const { toggleSave } = require("../controllers/toggleSave");


router.put("/:postId", toggleSave);

module.exports = router;


