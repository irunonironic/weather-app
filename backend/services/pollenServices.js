const axios = require('axios');
const TOMORROW_IO_API_KEY = process.env.TOMORROW_IO_API_KEY;
const TOMORROW_IO_BASE_URL = 'https://api.tomorrow.io/v4/weather';
const getCurrentPollenCount = async (lat, lon) => {
    try {
        const fields = [
            'treePollenIndex',
            'grassPollenIndex',
            'weedPollenIndex'
        ];
        const response = await axios.get(`${TOMORROW_IO_BASE_URL}/realtime`, {
            params: {
                location: `${lat},${lon}`, 
                units: 'metric', 
                apikey: TOMORROW_IO_API_KEY,
                fields: fields.join(',') 
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Pollen data from Tomorrow.io:', error.response ? error.response.data : error.message);
        throw new Error('Could not fetch pollen data for the specified coordinates from Tomorrow.io.');
    }
};

module.exports = {
    getCurrentPollenCount
};