const express = require('express');


const router = express.Router();
const { getfollwingreels } = require('../controllers/getfollowingreelsController');
router.get('/:userId', getfollwingreels);

module.exports = router;
