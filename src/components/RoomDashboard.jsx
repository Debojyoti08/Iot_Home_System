import React from 'react';
import { useParams } from 'react-router-dom';
import { useRooms } from '../context/RoomContext';
import ToggleSwitch from './ui/ToggleSwitch';
import Header from './layout/Header';

const RoomDashboard = () => {
  const { roomName } = useParams();
  const { rooms, toggleDevice } = useRooms();

  const room = rooms[roomName];

  if (!room) return <div className="text-white p-6">Room not found</div>;

  const renderControls = () => {
    const controls = [];

    if ('lights1' in room)
      controls.push(['Light 1', 'lights1']);
    if ('lights2' in room)
      controls.push(['Light 2', 'lights2']);
    if ('fan' in room)
      controls.push(['Fan', 'fan']);
    if ('ac' in room)
      controls.push(['AC', 'ac']);
    if ('geyser' in room)
      controls.push(['Geyser', 'geyser']);
    if ('lights' in room)
      controls.push(['Light', 'lights']);

    return controls.map(([label, key]) => (
      <div className="flex justify-between items-center bg-gray-800 rounded-xl p-4 mb-4" key={key}>
        <span className="text-white text-lg">{label}</span>
        <ToggleSwitch
          isOn={room[key]}
          onToggle={() => toggleDevice(roomName, key)}
        />
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">{room.displayName}</h2>
        {renderControls()}
      </div>
    </div>
  );
};

export default RoomDashboard;
