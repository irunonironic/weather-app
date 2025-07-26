const express = require('express');
const router = express.Router();

const weatherController = require('../controllers/weatherController');

router.get('/current',weatherController.getCurrentWeatherData);

router.get('/forecast',weatherController.getForecastData);

module.exports = router;