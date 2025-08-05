import React, { useState } from 'react';
import { Sun, Cloud, CloudRain, Wind, Eye, Droplets, Gauge, Sunrise, AlertCircle } from 'lucide-react';

// Component imports
import Header from './Header.jsx';
import CurrentWeather from './CurrentWeather.jsx';
import WeeklyForecast from './WeeklyForecast.jsx';
import TodayHighlights from './TodayHighlights.jsx';

// Custom hook for weather data
import useWeatherData from './useWeatherData.js';


const tempData = [
  { day: 'Sunday', temp: 28 },
  { day: 'Monday', temp: 26 },
  { day: 'Tuesday', temp: 27 },
  { day: 'Wednesday', temp: 23 },
  { day: 'Thursday', temp: 30 },
  { day: 'Friday', temp: 25 },
];

const WeatherDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');

  const {
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
  } = useWeatherData('New York');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      updateLocation(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return { icon: CloudRain, condition: 'rainy' };
    } else if (conditionLower.includes('cloud')) {
      return { icon: Cloud, condition: 'cloudy' };
    } else if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
      return { icon: Sun, condition: 'sunny' };
    }
    return { icon: Sun, condition: 'sunny' };
  };

  const weekData = getWeeklyForecast().map(day => ({
    day: day.day,
    temp: `${day.temp}°`,
    ...getWeatherIcon(day.condition)
  }));

  const highlights = [
    {
      title: 'UV Index',
      gauge: { 
        value: getUVIndex().toString(), 
        percentage: Math.max(Math.min(getUVIndex() * 10, 100),0.5) 
      },
      status: '',
      statusColor: ''
    },
    {
      title: 'Wind Status',
      value: getWindSpeed().toFixed(1),
      unit: 'm/s',
      subtitle: weatherData.current?.wind?.deg ? `${weatherData.current.wind.deg}°` : 'N/A',
      icon: Wind
    },
    {
      title: 'Sunrise & Sunset',
      value: getSunrise(),
      subtitle: getSunset(),
      icon: Sunrise
    },
    {
      title: 'Humidity',
      value: getHumidity().toString(),
      unit: '%',
      status: getHumidity() < 30 ? 'Low' : getHumidity() > 70 ? 'High' : 'Normal',
      statusColor: getHumidity() < 30 ? 'bg-yellow-400' : getHumidity() > 70 ? 'bg-red-400' : 'bg-green-400',
      icon: Droplets
    },
    {
      title: 'Visibility',
      value: getVisibility(),
      unit: 'km',
      status: parseFloat(getVisibility()) > 10 ? 'Excellent' : parseFloat(getVisibility()) > 5 ? 'Good' : 'Poor',
      statusColor: parseFloat(getVisibility()) > 10 ? 'bg-green-400' : parseFloat(getVisibility()) > 5 ? 'bg-yellow-400' : 'bg-red-400',
      icon: Eye
    },
    {
      title: 'Air Quality',
      value: getAirQualityIndex().toString(),
      status: getAirQualityIndex() <= 2 ? 'Good' : getAirQualityIndex() <= 3 ? 'Moderate' : 'Unhealthy',
      statusColor: getAirQualityIndex() <= 2 ? 'bg-green-400' : getAirQualityIndex() <= 3 ? 'bg-yellow-400' : 'bg-red-400',
      icon: Gauge
    }
  ];

  // ✅ Static date display without time
  const currentDate = new Date();
  const formatDate = () => {
    return currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen  p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
          <p className="text-black text-xl">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen   p-6 flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-black text-xl mb-4">Error loading weather data</p>
          <p className="text-black mb-6">{error}</p>
          <button 
            onClick={refreshData}
            className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-md  text-black-400 p-6">
      <div className="max-w-7xl mx-auto">
        <Header 
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <CurrentWeather
              location={location}
              temperature={getCurrentTemp()}
              condition={getCurrentCondition()}
              precipitation={`${getHumidity()}%`}
              weatherData={weatherData.current}
            />
          </div>
          
          <div className="lg:col-span-3 ">
            {weekData.length > 0 && <WeeklyForecast weekData={weekData} />}
            <TodayHighlights highlights={highlights} />
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard; 