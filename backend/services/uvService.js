const axios = require ('axios');
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const weatherService = require('../services/weatherService');
const getCurrentUVIndex = async(lat, lon) => {
    try{
        const response = await axios.get(`${OPENWEATHER_BASE_URL}/uvi`,{
            params : {
                lat: lat,
                lon : lon,
                appid : OPENWEATHER_API_KEY
            }
        });
        return response.data;
    }catch(error){
        console.error('Error fetching UV Index:',error.response ? error.response.data : error.message);
        throw new Error('Could not fetch UV Index data for the specified coordinates.');
    }
};

module.exports = {
    getCurrentUVIndex
}