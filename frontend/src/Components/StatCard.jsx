import React from 'react';

const StatCard = ({ title, value, unit, status, statusColor, icon: Icon, subtitle, gauge }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
    <div className="flex items-center justify-between mb-3">
      <span className="text-gray-300 text-sm">{title}</span>
      {Icon && <Icon className="w-4 h-4 text-gray-400" />}
    </div>
    
    {gauge ? (
      <div className="flex items-center justify-center mb-3">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
              fill="none"
              stroke="#0f0f0eff"
              strokeWidth="2"
            />
            <path
              d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
              fill="none"
              stroke="#be7c0aff"
              strokeWidth="2"
              strokeDasharray={`${gauge.percentage}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{gauge.value}</span>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex items-end gap-1 mb-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        {unit && <span className="text-gray-300 text-sm mb-1">{unit}</span>}
      </div>
    )}
    
    {subtitle && (
      <p className="text-gray-400 text-xs mb-2">{subtitle}</p>
    )}
    
    {status && (
      <div className="flex items-center gap-1">
        <div className={`w-2 h-2 rounded-full ${statusColor}`}></div>
        <span className="text-xs text-gray-300">{status}</span>
      </div>
    )}
  </div>
);

export default StatCard;