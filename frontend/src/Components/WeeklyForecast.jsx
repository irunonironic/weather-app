import React from 'react';
import WeatherIcon from './WeatherIcon';

const WeeklyForecast = ({ weekData }) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-7 gap-3">
        {weekData.map((day, index) => (
          <div 
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center hover:bg-white/15 transition-all cursor-pointer"
          >
            <p className="text-gray-300 text-sm mb-2">{day.day}</p>
            <div className="flex justify-center mb-2">
              <WeatherIcon IconComponent={day.icon} condition={day.condition} />
            </div>
            <p className="text-white font-medium">{day.temp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;