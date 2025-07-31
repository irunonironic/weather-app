// components/WeatherDashboard.jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import MainWeatherCard from './MainWeatherCard';
import WeeklyForecast from './WeeklyForecast';
import TodaysHighlights from './TodaysHighlights';
import { weatherAPI, handleAPIError } from '../services/weatherAPI';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [astronomyData, setAstronomyData] = useState(null);
  const [uvData, setUVData] = useState(null);
  const [pollenData, setPollenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState('New York, NY, USA');

  // Fetch all weather data from your backend
  const fetchWeatherData = async (location = currentLocation) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the combined function to get all data at once
      const allData = await weatherAPI.getCompleteWeatherData(location);
      
      // Set individual data pieces
      setWeatherData(allData.current);
      setForecastData(allData.forecast);
      setAirQualityData(allData.airQuality);
      setAstronomyData(allData.astronomy);
      setUVData(allData.uv);
      setPollenData(allData.pollen);
      
      setCurrentLocation(location);
      
      // Check if we have any critical errors
      if (!allData.current && !allData.forecast) {
        throw new Error('Failed to fetch essential weather data');
      }
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(handleAPIError(error));
    } finally {
      setLoading(false);
    }
  };

  // Alternative: Fetch data separately (if you prefer more control)
  const fetchWeatherDataSeparately = async (location = currentLocation) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch core weather data first (essential)
      const [current, forecast] = await Promise.all([
        weatherAPI.getCurrentWeather(location),
        weatherAPI.getWeatherForecast(location)
      ]);
      
      setWeatherData(current);
      setForecastData(forecast);
      
      // Fetch additional data (non-blocking)
      Promise.allSettled([
        weatherAPI.getAirQuality(location),
        weatherAPI.getAstronomy(location),
        weatherAPI.getUVIndex(location),
        weatherAPI.getPollen(location)
      ]).then(([airQuality, astronomy, uv, pollen]) => {
        setAirQualityData(airQuality.status === 'fulfilled' ? airQuality.value : null);
        setAstronomyData(astronomy.status === 'fulfilled' ? astronomy.value : null);
        setUVData(uv.status === 'fulfilled' ? uv.value : null);
        setPollenData(pollen.status === 'fulfilled' ? pollen.value : null);
      });
      
      setCurrentLocation(location);
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(handleAPIError(error));
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Handle location search
  const handleLocationSearch = (location) => {
    fetchWeatherData(location);
  };

  // Combine all data for the highlights component
  const getCombinedWeatherData = () => {
    if (!weatherData) return null;
    
    return {
      ...weatherData,
      // Add air quality data
      airQuality: airQualityData?.aqi || weatherData.airQuality || 0,
      airQualityStatus: airQualityData?.status || 'Unknown',
      
      // Add UV data
      uvIndex: uvData?.index || weatherData.uvIndex || 0,
      uvStatus: uvData?.status || 'Unknown',
      
      // Add astronomy data
      sunrise: astronomyData?.sunrise || weatherData.sunrise || '6:35 AM',
      sunset: astronomyData?.sunset || weatherData.sunset || '5:42 PM',
      
      // Add pollen data if needed
      pollenCount: pollenData?.total || 0,
      pollenStatus: pollenData?.status || 'Unknown',
    };
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-lg font-medium mb-2">
            Unable to load weather data
          </div>
          <div className="text-gray-600 mb-4">{error}</div>
          <div className="space-y-2">
            <button 
              onClick={() => fetchWeatherData()}
              className="block w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => {
                setError(null);
                setCurrentLocation('London, UK');
                fetchWeatherData('London, UK');
              }}
              className="block w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Try Different Location
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Header 
          onLocationSearch={handleLocationSearch}
          currentLocation={currentLocation}
        />
        
        {/* Debug info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 rounded text-xs">
            <strong>Debug:</strong> Current: {weatherData ? '✓' : '✗'}, 
            Forecast: {forecastData ? '✓' : '✗'}, 
            AirQ: {airQualityData ? '✓' : '✗'}, 
            Astro: {astronomyData ? '✓' : '✗'}, 
            UV: {uvData ? '✓' : '✗'}, 
            Pollen: {pollenData ? '✓' : '✗'}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <MainWeatherCard 
              weatherData={weatherData}
              isLoading={loading}
            />
          </div>
          
          <div className="lg:col-span-2">
            <WeeklyForecast 
              forecastData={forecastData}
              isLoading={loading}
            />
            
            <TodaysHighlights 
              weatherData={getCombinedWeatherData()}
              airQualityData={airQualityData}
              uvData={uvData}
              astronomyData={astronomyData}
              pollenData={pollenData}
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;