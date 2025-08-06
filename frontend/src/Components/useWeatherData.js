import { useState, useEffect, useCallback } from 'react';
import WeatherService from './weatherService';

const useWeatherData = (initialLocation = 'New York') => {
  const [weatherData, setWeatherData] = useState({
    current: null,
    forecast: null,
    airQuality: null,
    astronomy: null,
    uv: null,

  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(initialLocation);

  const fetchWeatherData = useCallback(async (searchLocation) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await WeatherService.getAllWeatherData(searchLocation);
      setWeatherData(data);
      

      if (data.errors.current || data.errors.forecast) {
        setError('Failed to fetch some weather data');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      console.error('Weather data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLocation = useCallback((newLocation) => {
    setLocation(newLocation);
    fetchWeatherData(newLocation);
  }, [fetchWeatherData]);

  const refreshData = useCallback(() => {
    fetchWeatherData(location);
  }, [fetchWeatherData, location]);

  useEffect(() => {
    fetchWeatherData(location);
  }, [fetchWeatherData, location]);


  const getCurrentTemp = () => {
    return weatherData.current?.main?.temp ? 
      `${Math.round(weatherData.current.main.temp)}°C` : 'N/A';
  };

  const getCurrentCondition = () => {
    return weatherData.current?.weather?.[0]?.description || 'Unknown';
  };

  const getHumidity = () => {
    return weatherData.current?.main?.humidity || 0;
  };

  const getWindSpeed = () => {
    return weatherData.current?.wind?.speed || 0;
  };

  const getVisibility = () => {
    return weatherData.current?.visibility ? 
      (weatherData.current.visibility / 1000).toFixed(1) : '0';
  };

  const getAirQualityIndex = () => {
    return weatherData.airQuality?.list?.[0]?.main?.aqi || 0;
  };

  const getUVIndex = () => {
    return weatherData.uv?.value || 0;
  };

  const getSunrise = () => {
    if (!weatherData.current?.sys?.sunrise) return 'N/A';
    return new Date(weatherData.current.sys.sunrise * 1000)
      .toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
  };

  const getSunset = () => {
    if (!weatherData.current?.sys?.sunset) return 'N/A';
    return new Date(weatherData.current.sys.sunset * 1000)
      .toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
  };

  const getWeeklyForecast = () => {
    if (!weatherData.forecast?.list) return [];
    
    // Group forecast by day and get daily data
    const dailyForecasts = {};
    weatherData.forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      if (!dailyForecasts[dayKey]) {
        dailyForecasts[dayKey] = {
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          temp: Math.round(item.main.temp),
          condition: item.weather[0].main.toLowerCase(),
          icon: item.weather[0].icon
        };
      }
    });

    return Object.values(dailyForecasts).slice(0, 7);
  };

  return {
    weatherData,
    loading,
    error,
    location,
    updateLocation,
    refreshData,
 
    getCurrentTemp,
    getCurrentCondition,
    getHumidity,
    getWindSpeed,
    getVisibility,
    getAirQualityIndex,
    getUVIndex,
    getSunrise,
    getSunset,
    getWeeklyForecast
  };
};

export default useWeatherData;