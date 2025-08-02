import React from 'react';

const WeatherIcon = ({ IconComponent, condition, size = "w-8 h-8" }) => {
  const getIconColor = () => {
    switch (condition) {
      case 'sunny': return 'text-yellow-400';
      case 'rainy': return 'text-blue-400';
      case 'cloudy': return 'text-gray-400';
      case 'partly-cloudy': return 'text-yellow-300';
      default: return 'text-yellow-400';
    }
  };

  return <IconComponent className={`${size} ${getIconColor()}`} />;
};

export default WeatherIcon;