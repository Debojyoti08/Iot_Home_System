import React from 'react';
import { Home, Wifi, Clock, LogOut, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTime } from '../../hooks/useTime';
import Button from '../ui/Button';

const Header = () => {
  const currentTime = useTime();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Home className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Smart Home Control
          </h1>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Status indicators */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-300">
                {currentUser?.displayName || currentUser?.email}
              </span>
            </div>
            
            <Button
              onClick={handleLogout}
              variant="secondary"
              className="flex items-center space-x-2 px-3 py-2 text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;