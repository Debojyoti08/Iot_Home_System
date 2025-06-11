import React, { useState } from 'react';
import Header from './layout/Header';
import RoomCard from './cards/RoomCard';
import PumpCard from './cards/PumpCard';
import { ROOM_CONFIG } from '../utils/constants';

const Dashboard = () => {
  const [rooms, setRooms] = useState(ROOM_CONFIG);

  const toggleRoomDevice = (roomName, device) => {
    setRooms(prev => ({
      ...prev,
      [roomName]: { 
        ...prev[roomName], 
        [device]: !prev[roomName][device] 
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {Object.entries(rooms).map(([roomName, roomData]) => (
            <RoomCard
              key={roomName}
              roomName={roomName}
              roomData={roomData}
              onToggleDevice={toggleRoomDevice}
            />
          ))}
        </div>

        {/* Water Pump Control */}
        <PumpCard />
      </div>
    </div>
  );
};

export default Dashboard;