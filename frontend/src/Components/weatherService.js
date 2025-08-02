// API base URL - adjust according to your backend port
const API_BASE_URL = 'http://localhost:8000/api';

class WeatherService {
  // Get current weather data
  static async getCurrentWeather(location, units = 'metric') {
    try {
      const response = await fetch(
        `${API_BASE_URL}/weather/current?location=${encodeURIComponent(location)}&units=${units}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  }

  // Get weather forecast
  static async getWeatherForecast(location, units = 'metric') {
    try {
      const response = await fetch(
        `${API_BASE_URL}/weather/forecast?location=${encodeURIComponent(location)}&units=${units}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
    }
  }

  // Get air quality data
  static async getAirQuality(location) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/air-quality?location=${encodeURIComponent(location)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching air quality:', error);
      throw error;
    }
  }

  // Get astronomy data
  static async getAstronomyData(location, date) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/astronomy?location=${encodeURIComponent(location)}&date=${date}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching astronomy data:', error);
      throw error;
    }
  }

  // Get UV index
  static async getUVIndex(location) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/uv?location=${encodeURIComponent(location)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching UV index:', error);
      throw error;
    }
  }

  // Get pollen count
  static async getPollenCount(location) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/pollen?location=${encodeURIComponent(location)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching pollen count:', error);
      throw error;
    }
  }

  // Get all weather data for a location (combined call)
  static async getAllWeatherData(location, units = 'metric') {
    try {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

      const [current, forecast, airQuality, astronomy, uv, pollen] = await Promise.allSettled([
        this.getCurrentWeather(location, units),
        this.getWeatherForecast(location, units),
        this.getAirQuality(location),
        this.getAstronomyData(location, today),
        this.getUVIndex(location),
        this.getPollenCount(location)
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
          pollen: pollen.status === 'rejected' ? pollen.reason : null
        }
      };
    } catch (error) {
      console.error('Error fetching all weather data:', error);
      throw error;
    }
  }
}

export default WeatherService;