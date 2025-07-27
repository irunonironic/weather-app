const axios = require('axios');
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_AQI_BASE_URL = 'https://api.openweathermap.org/data/2.5';



const getCurrentAQI = async (lat,lon)=>{
    try{
        const response = await axios.get(`${OPENWEATHER_AQI_BASE_URL}/air_pollution`,{
            params:{
                lat : lat,
                lon : lon,
                appid: OPENWEATHER_API_KEY
            }
        });
        return response.data;
    }catch(error){
        console.error('Error fetching API:',error.response ? error.response.data : error.message);
        throw new Error('Could not fetch air quality data for the specified coordinates.');
    }
};

module.exports = {
    getCurrentAQI
}