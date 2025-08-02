import React from 'react';
import StatCard from './StatCard';

const TodayHighlights = ({ highlights }) => {
  return (
    <div>
      <h2 className="text-xl font-medium text-white mb-4">Today's Highlights</h2>
      <div className="grid grid-cols-3 gap-4">
        {highlights.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default TodayHighlights;