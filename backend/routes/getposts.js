const express = require('express');


const router = express.Router();
const { getpostsController } = require('../controllers/getpostsController');
router.get('/', getpostsController);

module.exports = router;
