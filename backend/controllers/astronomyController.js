const weatherService = require('../services/weatherService');
const astronomyService = require('../services/astronomyService');

const getAstronomyDataController = async(req,res) =>{
    try{
        const {location, date} = req.query;

        if(!location || !date){
            return res.status(400).json({message: 'Location and date query parameters are required.'});
        }

        const {lat,lon} = await weatherService.getCoordinatesByLocation(location);
        
        const astronomyData = await astronomyService.getAstronomyData(lat, lon, date);
        
        res.status(200).json(astronomyData);

    }catch(error){
        console.error('Error in getAstronomyDataController:', error.message);
        res.status(500).json({message: 'Failed to fetch astronomical data.'});
    }
};

module.exports = {
    getAstronomyDataController
};