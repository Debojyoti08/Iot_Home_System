import React, { createContext, useContext, useState } from 'react';
import { ROOM_CONFIG } from '../utils/constants';

const RoomContext = createContext();

export const useRooms = () => useContext(RoomContext);

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(ROOM_CONFIG);

  const toggleDevice = (room, device) => {
    setRooms(prev => ({
      ...prev,
      [room]: {
        ...prev[room],
        [device]: !prev[room][device]
      }
    }));
  };

  return (
    <RoomContext.Provider value={{ rooms, toggleDevice }}>
      {children}
    </RoomContext.Provider>
  );
};


