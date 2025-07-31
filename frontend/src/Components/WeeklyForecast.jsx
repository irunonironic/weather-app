// components/WeeklyForecast.jsx
import React from 'react';
import WeatherIcon from './WeatherIcon';

const WeeklyForecast = ({ forecastData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-7 gap-2 mb-6">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-3 text-center animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!forecastData || forecastData.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 mb-6 text-center text-gray-500">
        No forecast data available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 gap-2 mb-6">
      {forecastData.map((day, index) => (
        <div key={index} className="bg-white rounded-lg p-3 text-center shadow-sm">
          <div className="text-xs text-gray-600 mb-2">{day.day}</div>
          <div className="flex justify-center mb-2">
            <WeatherIcon condition={day.icon} size="small" />
          </div>
          <div className="text-sm font-medium text-gray-900">{day.high}°</div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;