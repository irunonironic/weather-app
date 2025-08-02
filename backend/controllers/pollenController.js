const weatherService = require('../services/weatherService');
const pollenService = require('../services/pollenServices');

const getPollenData = async(req, res) => {
    try {
        const { location } = req.query;

        if (!location) {
            return res.status(400).json({ message: 'Location query parameter is required.' });
        }

        const mockAllCitiesPollenData = {
          "totalCities": 20,
          "countInResponse": 20,
          "data": [
            {
              "location": { "name": "Mumbai", "latitude": 19.0760, "longitude": 72.8777, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 6, "risk_level": "High" }, "types": [{ "type": "Tree", "index": 7, "risk_level": "Very High" }, { "type": "Grass", "index": 5, "risk_level": "Moderate" }], "dominant_types": ["Tree"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Delhi", "latitude": 28.7041, "longitude": 77.1025, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 4, "risk_level": "Moderate" }, "types": [{ "type": "Tree", "index": 3, "risk_level": "Low" }, { "type": "Weed", "index": 4, "risk_level": "Moderate" }], "dominant_types": ["Weed"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Bengaluru", "latitude": 12.9716, "longitude": 77.5946, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 2, "risk_level": "Low" }, "types": [{ "type": "Grass", "index": 2, "risk_level": "Low" }], "dominant_types": ["Grass"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Kolkata", "latitude": 22.5726, "longitude": 88.3639, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 5, "risk_level": "Moderate" }, "types": [{ "type": "Tree", "index": 6, "risk_level": "High" }], "dominant_types": ["Tree"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Ahmedabad", "latitude": 23.0225, "longitude": 72.5714, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 3, "risk_level": "Low" }, "types": [{ "type": "Weed", "index": 3, "risk_level": "Low" }, { "type": "Grass", "index": 2, "risk_level": "Low" }], "dominant_types": ["Weed"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Pune", "latitude": 18.5204, "longitude": 73.8567, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 7, "risk_level": "High" }, "types": [{ "type": "Tree", "index": 8, "risk_level": "Very High" }], "dominant_types": ["Tree"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Surat", "latitude": 21.1702, "longitude": 72.8311, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 1, "risk_level": "Low" }, "types": [{ "type": "Grass", "index": 1, "risk_level": "Low" }], "dominant_types": ["Grass"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Jaipur", "latitude": 26.9124, "longitude": 75.7873, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 4, "risk_level": "Moderate" }, "types": [{ "type": "Weed", "index": 5, "risk_level": "Moderate" }], "dominant_types": ["Weed"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Lucknow", "latitude": 26.8467, "longitude": 80.9462, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 5, "risk_level": "Moderate" }, "types": [{ "type": "Tree", "index": 5, "risk_level": "Moderate" }, { "type": "Grass", "index": 4, "risk_level": "Moderate" }], "dominant_types": ["Tree"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Kanpur", "latitude": 26.4499, "longitude": 80.3319, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 3, "risk_level": "Low" }, "types": [{ "type": "Weed", "index": 3, "risk_level": "Low" }], "dominant_types": ["Weed"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Nagpur", "latitude": 21.1458, "longitude": 79.0882, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 6, "risk_level": "High" }, "types": [{ "type": "Tree", "index": 7, "risk_level": "Very High" }], "dominant_types": ["Tree"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Visakhapatnam", "latitude": 17.6868, "longitude": 83.2185, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 2, "risk_level": "Low" }, "types": [{ "type": "Grass", "index": 2, "risk_level": "Low" }], "dominant_types": ["Grass"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Bhopal", "latitude": 23.2599, "longitude": 77.4126, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 4, "risk_level": "Moderate" }, "types": [{ "type": "Weed", "index": 4, "risk_level": "Moderate" }], "dominant_types": ["Weed"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Patna", "latitude": 25.5941, "longitude": 85.1376, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 5, "risk_level": "Moderate" }, "types": [{ "type": "Tree", "index": 6, "risk_level": "High" }], "dominant_types": ["Tree"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Vadodara", "latitude": 22.3072, "longitude": 73.1812, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 3, "risk_level": "Low" }, "types": [{ "type": "Grass", "index": 3, "risk_level": "Low" }], "dominant_types": ["Grass"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Ghaziabad", "latitude": 28.6692, "longitude": 77.4538, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 6, "risk_level": "High" }, "types": [{ "type": "Tree", "index": 7, "risk_level": "Very High" }], "dominant_types": ["Tree"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Ludhiana", "latitude": 30.9010, "longitude": 75.8573, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 4, "risk_level": "Moderate" }, "types": [{ "type": "Weed", "index": 4, "risk_level": "Moderate" }], "dominant_types": ["Weed"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Agra", "latitude": 27.1767, "longitude": 78.0078, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 5, "risk_level": "Moderate" }, "types": [{ "type": "Tree", "index": 5, "risk_level": "Moderate" }, { "type": "Grass", "index": 4, "risk_level": "Moderate" }], "dominant_types": ["Tree"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Nashik", "latitude": 19.9975, "longitude": 73.7898, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 3, "risk_level": "Low" }, "types": [{ "type": "Grass", "index": 3, "risk_level": "Low" }], "dominant_types": ["Grass"] },
              "apiSource": "MOCK_DATA"
            },
            {
              "location": { "name": "Faridabad", "latitude": 28.4089, "longitude": 77.3178, "country": "India" },
              "pollenData": { "date": "2025-07-27", "overall_pollen_level": { "index": 6, "risk_level": "High" }, "types": [{ "type": "Tree", "index": 7, "risk_level": "Very High" }], "dominant_types": ["Tree"] },
              "apiSource": "MOCK_DATA"
            }
          ]
        };
        const requestedCityName = location.toLowerCase(); 
        const foundCityData = mockAllCitiesPollenData.data.find(
            city => city.location.name.toLowerCase() === requestedCityName
        );

        if (foundCityData) {
            res.status(200).json({
                totalCities: 1,
                countInResponse: 1,
                data: [foundCityData],
                message: `Pollen data for ${foundCityData.location.name} .`
            });
        } else {
            res.status(404).json({ message: `Pollen data for '${location}' not found .` });
        }

    } catch (error) {
        console.error('Error in getPollenData controller (mocked):', error.message);
        res.status(500).json({ message: 'Failed to fetch pollen data ' });
    }
};

module.exports = {
    getPollenData
};