// src/components/cards/RoomCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Thermometer } from 'lucide-react';

const RoomCard = ({ roomName, roomData }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/room/${roomName}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-100">
          {roomData.displayName}
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">{roomData.devices} devices</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-4 h-4 text-orange-400" />
          <span className="text-sm text-gray-300">Temperature</span>
        </div>
        <span className="text-sm font-medium text-orange-400">{roomData.temp}°C</span>
      </div>
    </div>
  );
};

export default RoomCard;
