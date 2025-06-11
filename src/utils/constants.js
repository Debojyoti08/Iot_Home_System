export const ROOM_CONFIG = {
  room1: { 
    displayName: 'Living Room',
    lights: false, 
    fan: false, 
    temp: 22, 
    devices: 3 
  },
  room2: { 
    displayName: 'Bedroom',
    lights: true, 
    fan: false, 
    temp: 24, 
    devices: 2 
  },
  room3: { 
    displayName: 'Study Room',
    lights: false, 
    fan: true, 
    temp: 21, 
    devices: 4 
  },
  washroom: { 
    displayName: 'Washroom',
    lights: false, 
    fan: true, 
    temp: 23, 
    devices: 2 
  },
  kitchen: { 
    displayName: 'Kitchen',
    lights: true, 
    fan: false, 
    temp: 26, 
    devices: 5 
  }
};

export const PUMP_INITIAL_STATE = {
  isOn: false,
  waterLevel: 75,
  pressure: 2.5,
  flowRate: 12.3
};