const weatherService = require('../services/weatherService');
const airQualityService = require('../services/airQualityService');

const getAirQualityData = async(req, res) => {
    try{
        const {location} = req.query;
        if(!location){
            return res.status(400).json({message:'Location query parameter is required.' });

        }
        const { lat,lon } = await weatherService.getCoordinatesByLocation(location);
        const aqiData = await airQualityService.getCurrentAQI(lat, lon);
        res.status(200).json(aqiData);
}catch(error){
    console.error('Error in getAirQualityData controller:', error.message);
        res.status(500).json({ message: 'Failed to fetch air quality data.' });
    }
};

module.exports = {
    getAirQualityData
};
