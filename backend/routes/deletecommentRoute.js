
const express = require("express");
const router = express.Router();
const { deleteComment } = require("../controllers/deleteComment");

router.delete("/:postId/:commentId", deleteComment);  

module.exports = router;