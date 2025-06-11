import React from 'react';

const WaterLevelIndicator = ({ level }) => {
  return (
    <div className="relative w-16 h-24 bg-gray-800 rounded-lg border-2 border-gray-600 overflow-hidden">
      <div 
        className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-300 transition-all duration-1000 ease-out"
        style={{ height: `${level}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white drop-shadow-lg">
          {Math.round(level)}%
        </span>
      </div>
      {/* Water ripple effect */}
      <div 
        className="absolute w-full bg-blue-400 opacity-30"
        style={{ 
          height: '2px', 
          bottom: `${level}%`,
          animation: level > 0 ? 'ripple 2s infinite' : 'none'
        }}
      />
    </div>
  );
};

export default WaterLevelIndicator;