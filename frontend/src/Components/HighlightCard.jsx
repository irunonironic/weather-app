// components/HighlightCard.jsx
import React from 'react';
import { Sun } from 'lucide-react';

const HighlightCard = ({ title, value, unit, status, sunrise, sunset, icon: Icon, color }) => {
  if (title === 'Sunrise & Sunset') {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-sm text-gray-600 mb-3">{title}</div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Sun className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium">{sunrise}</span>
          </div>
          <div className="flex items-center">
            <Sun className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-sm font-medium">{sunset}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="text-sm text-gray-600 mb-3">{title}</div>
      <div className="flex items-center mb-2">
        <span className="text-2xl font-light text-gray-900 mr-1">{value}</span>
        <span className="text-sm text-gray-600">{unit}</span>
      </div>
      <div className="flex items-center">
        {Icon && <Icon className={`w-4 h-4 mr-1 ${color}`} />}
        <span className="text-sm text-gray-600">{status}</span>
      </div>
    </div>
  );
};

export default HighlightCard;