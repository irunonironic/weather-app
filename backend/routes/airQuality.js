const express = require('express');
const router = express.Router();
const airQualityController = require('../controllers/airQualityController');

router.get('/',airQualityController.getAirQualityData);
module.exports = router;