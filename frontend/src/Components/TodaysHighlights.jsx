// components/TodaysHighlights.jsx
import React from 'react';
import { Sun, Cloud, Eye, Wind } from 'lucide-react';
import HighlightCard from './HighlightCard';

const TodaysHighlights = ({ weatherData, isLoading }) => {
  if (isLoading) {
    return (
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Highlights</h3>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Highlights</h3>
        <div className="bg-white rounded-lg p-6 text-center text-gray-500">
          No highlights data available
        </div>
      </div>
    );
  }

  const highlights = [
    {
      title: 'UV Index',
      value: weatherData.uvIndex || 0,
      unit: '',
      status: 'Normal',
      icon: Sun,
      color: 'text-orange-500'
    },
    {
      title: 'Wind Status',
      value: weatherData.windSpeed || 0,
      unit: 'km/h',
      status: weatherData.windDirection || 'N',
      icon: Wind,
      color: 'text-blue-500'
    },
    {
      title: 'Sunrise & Sunset',
      sunrise: weatherData.sunrise || '6:35 AM',
      sunset: weatherData.sunset || '5:42 PM',
      icon: Sun,
      color: 'text-yellow-500'
    },
    {
      title: 'Humidity',
      value: weatherData.humidity || 0,
      unit: '%',
      status: 'Normal',
      icon: Cloud,
      color: 'text-blue-400'
    },
    {
      title: 'Visibility',
      value: weatherData.visibility || 0,
      unit: 'km',
      status: 'Average',
      icon: Eye,
      color: 'text-gray-500'
    },
    {
      title: 'Air Quality',
      value: weatherData.airQuality || 0,
      unit: '',
      status: 'Unhealthy',
      icon: Wind,
      color: 'text-red-500'
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Highlights</h3>
      <div className="grid grid-cols-3 gap-4">
        {highlights.map((item, index) => (
          <HighlightCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default TodaysHighlights;