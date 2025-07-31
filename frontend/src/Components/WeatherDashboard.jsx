import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './Header';
import MainWeatherCard from './MainWeatherCard';
import WeeklyForecast from './WeeklyForecast';
import TodaysHighlights from './TodaysHighlights';

// Helper function to get wind direction text (add this inside WeatherDashboard or as a utility)
const getWindDirection = (deg) => {
    if (deg > 337.5 || deg <= 22.5) return 'N';
    if (deg > 22.5 && deg <= 67.5) return 'NE';
    if (deg > 67.5 && deg <= 112.5) return 'E';
    if (deg > 112.5 && deg <= 157.5) return 'SE';
    if (deg > 157.5 && deg <= 202.5) return 'S';
    if (deg > 202.5 && deg <= 247.5) return 'SW';
    if (deg > 247.5 && deg <= 292.5) return 'W';
    if (deg > 292.5 && deg <= 337.5) return 'NW';
    return '';
};

// Helper function for AQI category (add this inside WeatherDashboard or as a utility)
const getAqiCategory = (aqiValue) => {
    if (aqiValue <= 50) return 'Good';
    if (aqiValue <= 100) return 'Moderate';
    if (aqiValue <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqiValue <= 200) return 'Unhealthy';
    if (aqiValue <= 300) return 'Very Unhealthy';
    return 'Hazardous';
};

const WeatherDashboard = ({ setAppLocation }) => {
  const [currentSearchLocation, setCurrentSearchLocation] = useState('Nagpur'); // Default location
  const [locationInput, setLocationInput] = useState(''); // State for search bar input
  
  const [allFetchedData, setAllFetchedData] = useState({ // Single state object for all data
    currentWeather: null,
    forecast: null,
    aqi: null,
    uv: null,
    pollen: null,
    astronomy: null,
  });

  const [loadingData, setLoadingData] = useState(true);
  const [errorData, setErrorData] = useState(null);

  useEffect(() => {
    if (!currentSearchLocation) {
        setLoadingData(false);
        return;
    }

    const fetchAllData = async () => {
      setLoadingData(true);
      setErrorData(null);
      
      if (setAppLocation) {
        try {
          const bgWeatherRes = await axios.get(`http://localhost:8000/api/weather/current?location=${currentSearchLocation}`);
          const description = bgWeatherRes.data.weather[0].description;
          setAppLocation(description); // Pass description to App.jsx to determine background
        } catch (bgErr) {
          console.warn("Could not set app background based on location:", bgErr.message);
          setAppLocation('clear'); // Fallback background
        }
      }

      try {
        const today = new Date().toISOString().slice(0, 10);
        const [
          currentWeatherRes,
          forecastRes,
          aqiRes,
          uvRes,
          pollenRes,
          astronomyRes
        ] = await Promise.all([
          axios.get(`http://localhost:8000/api/weather/current?location=${currentSearchLocation}`),
          axios.get(`http://localhost:8000/api/weather/forecast?location=${currentSearchLocation}`),
          axios.get(`http://localhost:8000/api/air-quality?location=${currentSearchLocation}`),
          axios.get(`http://localhost:8000/api/uv?location=${currentSearchLocation}`),
          axios.get(`http://localhost:8000/api/pollen?location=${currentSearchLocation}`),
          axios.get(`http://localhost:8000/api/astronomy?location=${currentSearchLocation}&date=${today}`)
        ]);
        
        setAllFetchedData({
          currentWeather: currentWeatherRes.data,
          forecast: forecastRes.data,
          aqi: aqiRes.data,
          uv: uvRes.data,
          pollen: pollenRes.data,
          astronomy: astronomyRes.data,
        });

      } catch (err) {
        console.error("Error fetching all data for dashboard:", err);
        setErrorData("Failed to load data for this location. Please try another city.");
      } finally {
        setLoadingData(false);
      }
    };

    fetchAllData();
  }, [currentSearchLocation, setAppLocation]);

  const handleLocationSearch = (location) => {
    if (location.trim()) {
      setCurrentSearchLocation(location.trim());
      setLocationInput(''); // Clear input if it were controlled here
    }
  };

  if (loadingData && !allFetchedData.currentWeather) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-gray-600 text-lg font-medium mb-2">Loading weather dashboard...</div>
          <div className="text-gray-500">Fetching data for {currentSearchLocation}</div>
        </div>
      </div>
    );
  }

  if (errorData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-lg font-medium mb-2">Error</div>
          <div className="text-gray-600 mb-4">{errorData}</div>
          <button 
            onClick={() => setCurrentSearchLocation('Mumbai')} // Simple retry by resetting location
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Default City
          </button>
        </div>
      </div>
    );
  }

  // Destructure data for child components
  const { currentWeather, forecast, aqi, uv, pollen, astronomy } = allFetchedData;

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-0 bg-gray-50 font-poppins text-gray-800">
      <Header 
        onLocationSearch={handleLocationSearch} 
        currentLocation={currentSearchLocation} 
      />
      
      <div className="container mx-auto p-4 md:p-8 mt-20 flex flex-grow">
        <div className="flex flex-col lg:flex-row w-full gap-6">
          <div className="lg:w-1/3">
            {currentWeather && (
              <MainWeatherCard 
                weatherData={currentWeather}
                isLoading={loadingData}
              />
            )}
          </div>
          
          <div className="lg:w-2/3 flex flex-col gap-6">
            {forecast && (
              <WeeklyForecast 
                forecastData={forecast} // Pass raw forecast data, WeeklyForecast will map it
                isLoading={loadingData}
              />
            )}
            
            {currentWeather && aqi && uv && pollen && astronomy && ( // Only pass if all data potentially exists for highlights
              <TodaysHighlights 
                weatherData={{ // Map data to expected props for TodaysHighlights
                    currentWeather: currentWeather,
                    aqi: aqi,
                    uv: uv,
                    pollen: pollen,
                    astronomy: astronomy,
                    currentLocation: currentSearchLocation, // Pass current location for pollen mock filter
                }}
                isLoading={loadingData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;