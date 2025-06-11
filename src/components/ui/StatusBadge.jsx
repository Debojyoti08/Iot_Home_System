import React from 'react';

const StatusBadge = ({ type, text }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 text-green-400';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'danger':
        return 'bg-red-500/20 text-red-400';
      case 'info':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getTypeStyles()}`}>
      <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
      <span>{text}</span>
    </div>
  );
};

export default StatusBadge;