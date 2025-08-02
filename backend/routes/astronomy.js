const express = require('express');
const router = express.Router();
const astronomyController = require('../controllers/astronomyController');
router.get('/', astronomyController.getAstronomyDataController);
module.exports = router;