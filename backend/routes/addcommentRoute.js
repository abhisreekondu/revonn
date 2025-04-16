// routes/comments.js
const express = require("express");
const router = express.Router();
const { addComment } = require("../controllers/addComment");

router.post("/:postId", addComment);  

module.exports = router;
