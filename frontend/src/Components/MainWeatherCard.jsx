// components/MainWeatherCard.jsx
import React from 'react';
import { CloudRain } from 'lucide-react';

const MainWeatherCard = ({ weatherData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
        <div className="h-16 bg-gray-200 rounded mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="text-center text-gray-500">No weather data available</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"></div>
          <div className="absolute top-2 right-0 flex flex-col space-y-1">
            <div className="w-1 h-6 bg-blue-400 rounded"></div>
            <div className="w-1 h-6 bg-blue-400 rounded"></div>
            <div className="w-1 h-6 bg-blue-400 rounded"></div>
            <div className="w-1 h-6 bg-blue-400 rounded"></div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-5xl font-light text-gray-900 mb-1">
          {weatherData.temperature}°C
        </div>
        <div className="text-gray-600 mb-4">
          {weatherData.date}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center text-gray-700 mb-2">
          <CloudRain className="w-4 h-4 mr-2 text-blue-400" />
          <span className="text-sm">Rain - {weatherData.rainChance}%</span>
        </div>
        <div className="text-sm text-gray-600">{weatherData.condition}</div>
      </div>

      <div className="bg-gray-100 rounded-lg p-3 relative">
        <div className="w-full h-20 bg-gray-300 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 text-sm">Location Image</span>
        </div>
        <div className="text-white text-sm font-medium mt-2 absolute bottom-5 left-5 bg-black bg-opacity-50 px-2 py-1 rounded">
          {weatherData.location}
        </div>
      </div>
    </div>
  );
};

export default MainWeatherCard;