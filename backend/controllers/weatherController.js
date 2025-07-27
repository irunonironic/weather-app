const weatherService = require('../services/weatherService');

const getCurrentWeatherData = async(req , res) => {
    
    try{
        const {location , units} = req.query;
        if(!location){
            return res.status(400).json({message: 'Location query parameter is required.'});
        }
        const weatherData = await weatherService.getCurrentWeather(location, units);
        res.status(200).json(weatherData);
    }catch(error){
        console.error('Error in getCurrentWeatherData controller:',error.message);
        res.status(500).json({message: 'Failed to fetch current weather data.'});
    }
};

const getForecastData = async(req,res) => {
    try{
        const {location, units} = req.query;
        if(!location){
            return res.status(400).json({message:'Location query parameter is required.'});
        }
        const forecastData = await weatherService.getForecast(location,units);
        res.status(200).json(forecastData);
    }catch(error){
        console.error('Error in getForecast controller:',error.message);
        res.status(500).json({message:'Failed to fetch forecast data.'});
    }
};


module.exports = {
    getCurrentWeatherData,
    getForecastData
};