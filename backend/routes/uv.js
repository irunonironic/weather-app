const express = require('express');
const router = express.Router();

const uvController = require('../controllers/uvController');

router.get('/',uvController.getUVIndexData);

module.exports = router;