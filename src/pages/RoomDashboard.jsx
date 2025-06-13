import React, { useState } from 'react';

const ROOM_CONTROLS = {
  'room1': ['Light 1', 'Light 2', 'Fan', 'AC'],
  'room2': ['Light 1', 'Light 2', 'Fan', 'AC'],
  'room3': ['Light 1', 'Light 2', 'Fan', 'AC'],
  'washroom': ['Light', 'Geyser'],
  'kitchen': ['Light', 'Fan']
};

// Toggle Switch Component
const ToggleSwitch = ({ isOn, onToggle }) => {
  return (
    <div 
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
        isOn ? 'bg-blue-500' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </div>
  );
};

// Circular Fan Regulator Component
const FanRegulator = ({ speed, onSpeedChange }) => {
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    let angle = Math.atan2(y, x) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    const clickedSpeed = Math.ceil((angle / 360) * 5);
    onSpeedChange(Math.min(Math.max(clickedSpeed, 1), 5)); // Clamp between 1–5
  };

  // Calculate the angle for the speed indicator
  const indicatorAngle = (speed - 1) * 72 - 45;

  return (
    <div className="mt-6 flex flex-col items-center">
      <h4 className="text-lg font-semibold mb-4 text-gray-100">Fan Speed: {speed}/5</h4>

      <div
        onClick={handleClick}
        className="relative w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-gray-700 cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
      >
        {/* Speed Labels (1–5) */}
        {[...Array(5)].map((_, i) => {
          const angle = (i * 72) - 90;
          const rad = angle * (Math.PI / 180);
          const r = 50;
          const x = 64 + r * Math.cos(rad);
          const y = 64 + r * Math.sin(rad);
          const isActive = speed === i + 1;
          
          return (
            <div
              key={i}
              className={`absolute text-sm font-medium transition-all duration-200 ${
                isActive ? 'text-blue-400 scale-125 font-bold' : 'text-gray-300'
              }`}
              style={{
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
                textShadow: isActive ? '0 0 8px rgba(56, 189, 248, 0.5)' : 'none'
              }}
            >
              {i + 1}
            </div>
          );
        })}

        {/* Center Dial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-20 h-20 rounded-full bg-gray-700 border-2 border-gray-600 shadow-inner flex items-center justify-center">
            {/* Speed Indicator Arrow */}
            <div 
              className="absolute w-6 h-6 bg-blue-500 rounded-full top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                transform: `rotate(${indicatorAngle}deg) translateY(-28px) rotate(-${indicatorAngle}deg)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            
            {/* Center Number */}
            <span className="text-xl font-bold text-white">{speed}</span>
          </div>
        </div>

        {/* Speed Markers */}
        {[...Array(5)].map((_, i) => {
          const angle = (i * 72) - 90;
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gray-500 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${angle}deg) translate(0, -46px)`,
                transformOrigin: 'left center'
              }}
            />
          );
        })}
      </div>

      <p className="text-sm text-gray-400 mt-3 text-center">
        Click around the circle to adjust speed
      </p>
    </div>
  );
};

const RoomDashboard = () => {
  const [currentRoom, setCurrentRoom] = useState('room1');
  const controls = ROOM_CONTROLS[currentRoom] || [];

  const [deviceStates, setDeviceStates] = useState(
    Object.keys(ROOM_CONTROLS).reduce((acc, room) => {
      acc[room] = ROOM_CONTROLS[room].reduce((deviceAcc, device) => {
        deviceAcc[device] = false;
        return deviceAcc;
      }, {});
      return acc;
    }, {})
  );

  const [fanSpeeds, setFanSpeeds] = useState(
    Object.keys(ROOM_CONTROLS).reduce((acc, room) => {
      acc[room] = ROOM_CONTROLS[room]
        .filter(device => device.toLowerCase().includes('fan'))
        .reduce((fanAcc, fan) => {
          fanAcc[fan] = 0;
          return fanAcc;
        }, {});
      return acc;
    }, {})
  );

  const toggleDevice = (device) => {
    setDeviceStates((prev) => ({
      ...prev,
      [currentRoom]: {
        ...prev[currentRoom],
        [device]: !prev[currentRoom]?.[device],
      }
    }));
    
    // If turning off a fan, reset its speed
    if (device.toLowerCase().includes('fan') && deviceStates[currentRoom]?.[device]) {
      setFanSpeeds(prev => ({
        ...prev,
        [currentRoom]: {
          ...prev[currentRoom],
          [device]: 0
        }
      }));
    }
  };

  const handleFanSpeedChange = (device, speed) => {
    setFanSpeeds(prev => ({
      ...prev,
      [currentRoom]: {
        ...prev[currentRoom],
        [device]: speed
      }
    }));
    
    // If speed is set and fan is off, turn it on
    if (speed > 0 && !deviceStates[currentRoom]?.[device]) {
      setDeviceStates(prev => ({
        ...prev,
        [currentRoom]: {
          ...prev[currentRoom],
          [device]: true
        }
      }));
    }
  };

  const getDeviceStatus = (device) => {
    const isOn = deviceStates[currentRoom]?.[device];
    if (!isOn) return 'OFF';
    
    if (device.toLowerCase().includes('fan') && fanSpeeds[currentRoom]?.[device] !== undefined) {
      return `ON (Speed: ${fanSpeeds[currentRoom][device]})`;
    }
    
    return 'ON';
  };

  const getStatusColor = (device) => {
    const isOn = deviceStates[currentRoom]?.[device];
    return isOn ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold capitalize">
          {currentRoom.replace('-', ' ')} Controls
        </h2>
        
        {/* Room Selector */}
        <select
          value={currentRoom}
          onChange={(e) => setCurrentRoom(e.target.value)}
          className="bg-gray-700 px-4 py-2 rounded text-white border border-gray-600 focus:border-gray-500 focus:outline-none"
        >
          {Object.keys(ROOM_CONTROLS).map(room => (
            <option key={room} value={room}>
              {room.charAt(0).toUpperCase() + room.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </div>

      {controls.length === 0 ? (
        <p className="text-gray-400">No controls available for this room.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {controls.map((device, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg">{device}</span>
                <ToggleSwitch
                  isOn={deviceStates[currentRoom]?.[device] || false}
                  onToggle={() => toggleDevice(device)}
                />
              </div>
              
              {/* Device Status */}
              <div className="mb-2">
                <span className="text-sm text-gray-300">Status: </span>
                <span className={`text-sm font-medium ${getStatusColor(device)}`}>
                  {getDeviceStatus(device)}
                </span>
              </div>
              
              {/* Fan Regulator - only show when fan is on */}
              {device.toLowerCase().includes('fan') && deviceStates[currentRoom]?.[device] && (
                <FanRegulator
                  speed={fanSpeeds[currentRoom]?.[device] || 0}
                  onSpeedChange={(speed) => handleFanSpeedChange(device, speed)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomDashboard;