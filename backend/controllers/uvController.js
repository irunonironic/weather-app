const weatherService = require('../services/weatherService');
const uvService = require('../services/uvService')

const getUVIndexData = async(req,res) => {
    try{
    const {location } = req.query;
    if(!location){
         return res.status(400).json({ message: 'Location query parameter is required.' });
    }

    const {lat,lon} = await weatherService.getCoordinatesByLocation(location);
      console.log('Coordinates received by UV controller: Lat:', lat, 'Lon:', lon);
    const uvData = await uvService.getCurrentUVIndex(lat,lon);
    res.status(200).json(uvData);
    }catch(error){
        console.error('Error in getUVIndexData controller:',error.message);
        res.status(500).json({message:'Failed to fetch UV Index data.'});
    }
};

module.exports = {
    getUVIndexData
}