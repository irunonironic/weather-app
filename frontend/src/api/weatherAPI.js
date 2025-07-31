// services/weatherAPI.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function to get auth token if needed
const getAuthToken = () => {
  return localStorage.getItem('authToken'); // Adjust based on your auth implementation
};

// Helper function to create headers
const createHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

export const weatherAPI = {
  // Current weather - GET /api/weather/current
  getCurrentWeather: async (location) => {
    try {
      const url = new URL(`${API_BASE_URL}/api/weather/current`);
      url.searchParams.append('location', location);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: createHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  // Weather forecast - GET /api/weather/forecast
  getWeatherForecast: async (location) => {
    try {
      const url = new URL(`${API_BASE_URL}/api/weather/forecast`);
      url.searchParams.append('location', location);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: createHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
    }
  },

  // Air quality - GET /api/air-quality/
  getAirQuality: async (location) => {
    try {
      const url = new URL(`${API_BASE_URL}/api/air-quality/`);
      url.searchParams.append('location', location);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: createHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('Error fetching air quality:', error);
      throw error;
    }
  },

  // Astronomy data - GET /api/astronomy/
  getAstronomy: async (location) => {
    try {
      const url = new URL(`${API_BASE_URL}/api/astronomy/`);
      url.searchParams.append('location', location);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: createHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('Error fetching astronomy data:', error);
      throw error;
    }
  },

  // UV index - GET /api/uv/
  getUVIndex: async (location) => {
    try {
      const url = new URL(`${API_BASE_URL}/api/uv/`);
      url.searchParams.append('location', location);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: createHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('Error fetching UV index:', error);
      throw error;
    }
  },

  // Pollen data - GET /api/pollen/
  getPollen: async (location) => {
    try {
      const url = new URL(`${API_BASE_URL}/api/pollen/`);
      url.searchParams.append('location', location);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: createHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('Error fetching pollen data:', error);
      throw error;
    }
  },

  // Combined weather data (gets multiple endpoints at once)
  getCompleteWeatherData: async (location) => {
    try {
      const [current, forecast, airQuality, astronomy, uv, pollen] = await Promise.allSettled([
        weatherAPI.getCurrentWeather(location),
        weatherAPI.getWeatherForecast(location),
        weatherAPI.getAirQuality(location),
        weatherAPI.getAstronomy(location),
        weatherAPI.getUVIndex(location),
        weatherAPI.getPollen(location)
      ]);

      return {
        current: current.status === 'fulfilled' ? current.value : null,
        forecast: forecast.status === 'fulfilled' ? forecast.value : null,
        airQuality: airQuality.status === 'fulfilled' ? airQuality.value : null,
        astronomy: astronomy.status === 'fulfilled' ? astronomy.value : null,
        uv: uv.status === 'fulfilled' ? uv.value : null,
        pollen: pollen.status === 'fulfilled' ? pollen.value : null,
        errors: {
          current: current.status === 'rejected' ? current.reason : null,
          forecast: forecast.status === 'rejected' ? forecast.reason : null,
          airQuality: airQuality.status === 'rejected' ? airQuality.reason : null,
          astronomy: astronomy.status === 'rejected' ? astronomy.reason : null,
          uv: uv.status === 'rejected' ? uv.reason : null,
          pollen: pollen.status === 'rejected' ? pollen.reason : null,
        }
      };
    } catch (error) {
      console.error('Error fetching complete weather data:', error);
      throw error;
    }
  }
};

// Auth API functions - GET /api/auth/register and /api/auth/login
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Store token if registration successful
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Store token if login successful
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },

  isAuthenticated: () => {
    return !!getAuthToken();
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
    return 'Authentication failed. Please log in again.';
  }
  if (error.message.includes('403')) {
    return 'Access forbidden. Please check your permissions.';
  }
  if (error.message.includes('429')) {
    return 'Too many requests. Please try again later.';
  }
  if (error.message.includes('500')) {
    return 'Server error. Please try again later.';
  }
  return 'Something went wrong. Please try again.';
};

export default weatherAPI;