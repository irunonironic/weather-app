// components/WeatherIcon.jsx
import React from 'react';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';

const WeatherIcon = ({ condition, size = 'large' }) => {
  const iconSize = size === 'large' ? 'w-20 h-20' : 'w-8 h-8';
  const iconColor = 'text-yellow-400';

  const getIcon = () => {
    switch (condition?.toLowerCase()) {
      case 'sun':
      case 'sunny':
      case 'clear':
        return <Sun className={`${iconSize} ${iconColor}`} />;
      case 'cloud-rain':
      case 'rain':
      case 'rainy':
        return <CloudRain className={`${iconSize} text-blue-400`} />;
      case 'snow':
      case 'snowy':
        return <Snowflake className={`${iconSize} text-blue-200`} />;
      case 'cloud':
      case 'cloudy':
      case 'mostly cloudy':
      default:
        return <Cloud className={`${iconSize} text-gray-400`} />;
    }
  };

  return getIcon();
};

export default WeatherIcon;