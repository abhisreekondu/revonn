// routes/comments.js
const express = require("express");
const router = express.Router();
const { getComments } = require("../controllers/allcomments");

router.get("/:postId", getComments); 

module.exports = router;
