const express = require('express');
const router = express.Router();
const pollenController = require('../controllers/pollenController');
router.get('/', pollenController.getPollenData);
module.exports = router;