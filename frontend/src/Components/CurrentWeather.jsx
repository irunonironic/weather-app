import React from 'react';
import { MapPin, Sun, CloudRain } from 'lucide-react';

const CurrentWeather = ({ location, temperature, condition, precipitation, time }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 h-fit">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <Sun className="w-16 h-16 text-yellow-400" />
          <div className="absolute -right-2 top-2">
            <div className="flex gap-1">
              <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
              <div className="w-1 h-6 bg-blue-400 rounded-full mt-2"></div>
              <div className="w-1 h-10 bg-blue-400 rounded-full"></div>
              <div className="w-1 h-4 bg-blue-400 rounded-full mt-4"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h1 className="text-5xl font-light text-white mb-2">{temperature}</h1>
        <p className="text-gray-300">{time}</p>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <CloudRain className="w-4 h-4 text-blue-400" />
        <span className="text-gray-300 text-sm">Rain - {precipitation}</span>
      </div>
      
      <div className="flex items-center gap-2 bg-black/30 rounded-xl p-3">
        <MapPin className="w-4 h-4 text-white" />
        <span className="text-white text-sm font-medium">{location}</span>
      </div>
    </div>
  );
};

export default CurrentWeather;