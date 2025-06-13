// src/components/ui/ToggleSwitch.jsx
import React from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../../firebase';

const ToggleSwitch = ({ isOn, room, device }) => {
  const toggle = () => {
    const deviceRef = ref(db, `devices/${room}/${device}`);
    set(deviceRef, !isOn);
  };

  return (
    <button
      onClick={toggle}
      className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
        isOn ? 'bg-blue-500' : 'bg-gray-600'
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
        isOn ? 'left-6' : 'left-0.5'
      }`} />
    </button>
  );
};

export default ToggleSwitch;
