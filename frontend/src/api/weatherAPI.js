// services/weatherAPI.js

 const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';


export const weatherAPI = {
  getCurrentWeather: async (location) => {
    try {
      // Replace with your actual backend endpoint
      const response = await fetch(`${API_BASE_URL}/weather/current?location=${encodeURIComponent(location)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication header if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('Error fetching current weather:', error);
      
      // Fallback to mock data during development
      return {
        temperature: 12,
        condition: 'Mostly Cloudy',
        location: location || 'New York, NY, USA',
        date: new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        rainChance: 30,
        uvIndex: 5,
        windSpeed: 7.70,
        windDirection: 'WSW',
        humidity: 12,
        visibility: 5.2,
        airQuality: 105,
        sunrise: '6:35 AM',
        sunset: '5:42 PM'
      };
    }
  },
  
  getWeeklyForecast: async (location) => {
    try {
      // Replace with your actual backend endpoint
      const response = await fetch(`${API_BASE_URL}/weather/forecast?location=${encodeURIComponent(location)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication header if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('Error fetching weekly forecast:', error);
      
      // Fallback to mock data during development
      return [
        { day: 'Sun', icon: 'sun', high: 15, low: null },
        { day: 'Mon', icon: 'cloud-rain', high: 12, low: null },
        { day: 'Tue', icon: 'cloud-rain', high: 9, low: null },
        { day: 'Wed', icon: 'cloud-rain', high: 8, low: null },
        { day: 'Thu', icon: 'snow', high: 5, low: null },
        { day: 'Fri', icon: 'sun', high: 4, low: null },
        { day: 'Sat', icon: 'sun', high: 3, low: null }
      ];
    }
  },

  // Additional API methods you might need
  searchLocations: async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/weather/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      return await response.json();
    } catch (error) {
      console.error('Error searching locations:', error);
      return [];
    }
  },

  getHourlyForecast: async (location) => {
    try {
      const response = await fetch(`${API_BASE_URL}/weather/hourly?location=${encodeURIComponent(location)}`);
      if (!response.ok) throw new Error('Hourly forecast failed');
      return await response.json();
    } catch (error) {
      console.error('Error fetching hourly forecast:', error);  
      return [];
    }
  }
};

// Utility function to handle API errors
export const handleAPIError = (error) => {
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Network error. Please check your connection.';
  }
  if (error.message.includes('404')) {
    return 'Location not found.';
  }
  if (error.message.includes('401')) {
    return 'Authentication failed. Please check your API key.';
  }
  if (error.message.includes('429')) {
    return 'Too many requests. Please try again later.';
  }
  return 'Something went wrong. Please try again.';
};

export default weatherAPI;