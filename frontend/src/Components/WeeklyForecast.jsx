import React from 'react';
import WeatherIcon from './WeatherIcon';
import TemperatureChart from './TemperatureChart';
const WeeklyForecast = ({ weekData }) => {
  return (
    <div>
      <div className='pr-42'>
        <TemperatureChart data={weekData} />
        </div>
         <div className="mt-0 mb-6">
       
     
      <div className="grid grid-cols-7 gap-3">
        {weekData.map((day, index) => (
          <div 
            key={index}
            className="bg-white  backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center hover:bg-white/15 transition-all cursor-pointer"
          >
            <p className="text-black text-sm mb-2">{day.day}</p>
            <div className="flex justify-center mb-2">
              <WeatherIcon IconComponent={day.icon} condition={day.condition} />
            </div>
            <p className="text-white font-medium">{day.temp}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
   
  );
};

export default WeeklyForecast;