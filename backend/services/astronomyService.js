const axios = require('axios');

const ASTRONOMY_API_ID = process.env.ASTRONOMY_API_ID;
const ASTRONOMY_API_SECRET = process.env.ASTRONOMY_API_SECRET;
const ASTRONOMY_BASE_URL = 'https://api.astronomyapi.com/api/v2';

const getAstronomyData = async(lat,lon,date) =>{
    try{        console.log('--- Astronomy API Debug ---');
        console.log('Using Astronomy API ID (first 5):', ASTRONOMY_API_ID ? ASTRONOMY_API_ID.substring(0, 5) + '...' : 'UNDEFINED');
        console.log('Requesting URL:', `${ASTRONOMY_BASE_URL}/bodies/positions`);
        console.log('Request Params:', { latitude: lat, longitude: lon, date: date, time: '00:00:00' });
        const response = await axios.get(`${ASTRONOMY_BASE_URL}/bodies/positions`,{
            params:{
                latitude : lat,
                longitude : lon,
                elevation: 0,
                from_date: date,
                to_date: date,
                date : date,
                time: '00:00:00'
            },
            headers: {
                Authorization: 'Basic ' + Buffer.from(`${ASTRONOMY_API_ID}:${ASTRONOMY_API_SECRET}`).toString('base64')
            }
        });
        return response.data;
    }catch(error){
        console.error('Error fetching astronomy data:', error.response ? error.response.data : error.message);
        throw new Error('Could not fetch astronomical data for the specified location and date.');
    }
};

module.exports = {
    getAstronomyData
};