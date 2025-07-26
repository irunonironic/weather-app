const axios = require('axios')
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getCurrentWeather = async (location, units = 'metric') => {
    try{
        const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`,{
            params:{
                q:location,
                appid:OPENWEATHER_API_KEY,
                units:units
            }
        });

        return response.data;
    }catch(error){
        console.error('Error fetching current weather', error.response ? error.response.data : error.message);
        throw new Error('Could not fetch current weather data for the specified location.');
    }
};


const getForecast = async (location, units ='metric') =>{
try{
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`,{
        params:{
            q:location,
            appid:OPENWEATHER_API_KEY,
            units:units
        }
    });
    return response.data;
} catch (error) { 
    console.error('Error fetching forecast:' , error.response? error.response.data : error.message);
    throw new Error('could not fetch forecast data for the specified location.');
}
};


module.exports = {
    getCurrentWeather,
    getForecast
};