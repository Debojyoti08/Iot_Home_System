import React from 'react';
import { Droplets, Power, Battery } from 'lucide-react';
import { usePump } from '../../hooks/usePump';
import WaterLevelIndicator from '../ui/WaterLevelIndicator';
import StatusBadge from '../ui/StatusBadge';

const PumpCard = () => {
  const { pump, togglePump } = usePump();

  return (
    <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-700/50 hover:border-blue-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-full ${pump.isOn ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700/50 text-gray-400'}`}>
            <Droplets className={`w-6 h-6 ${pump.isOn ? 'animate-bounce' : ''}`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Water Pump</h2>
            <p className="text-sm text-gray-400">
              Status: <span className={pump.isOn ? 'text-green-400' : 'text-red-400'}>
                {pump.isOn ? 'Running' : 'Stopped'}
              </span>
            </p>
          </div>
        </div>
        
        <button
          onClick={togglePump}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
            pump.isOn 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25' 
              : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25'
          }`}
        >
          <Power className="w-5 h-5" />
          <span>{pump.isOn ? 'Turn Off' : 'Turn On'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Water Level */}
        <div className="flex flex-col items-center space-y-3">
          <h3 className="text-lg font-semibold text-gray-200">Water Level</h3>
          <WaterLevelIndicator level={pump.waterLevel} />
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{Math.round(pump.waterLevel)}%</div>
            <div className="text-xs text-gray-400">Tank Capacity</div>
          </div>
        </div>

        {/* Stats */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <Battery className="w-5 h-5 text-green-400" />
              <h4 className="font-semibold text-gray-200">Pressure</h4>
            </div>
            <div className="text-2xl font-bold text-green-400">
              {pump.pressure.toFixed(1)} <span className="text-sm text-gray-400">bar</span>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-400" />
              <h4 className="font-semibold text-gray-200">Flow Rate</h4>
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {pump.flowRate.toFixed(1)} <span className="text-sm text-gray-400">L/min</span>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <Power className="w-5 h-5 text-purple-400" />
              <h4 className="font-semibold text-gray-200">Power</h4>
            </div>
            <div className="text-2xl font-bold text-purple-400">
              {pump.isOn ? '1.2' : '0.0'} <span className="text-sm text-gray-400">kW</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-6 flex flex-wrap gap-3">
        <StatusBadge
          type={pump.waterLevel > 80 ? 'success' : pump.waterLevel > 30 ? 'warning' : 'danger'}
          text={pump.waterLevel > 80 ? 'Tank Full' : pump.waterLevel > 30 ? 'Normal Level' : 'Low Water Level'}
        />
        
        <StatusBadge
          type={pump.isOn ? 'info' : 'secondary'}
          text={`Motor ${pump.isOn ? 'Active' : 'Idle'}`}
        />
      </div>
    </div>
  );
};

export default PumpCard;