import React from 'react';
import { Home, Shield } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-full">
              <Home className="w-8 h-8 text-blue-400" />
            </div>
            <Shield className="w-6 h-6 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Smart Home Control
          </h1>
          <p className="text-gray-400 mt-2">Secure IoT Management System</p>
        </div>

        {/* Auth Form Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-gray-400 mt-2">{subtitle}</p>}
          </div>
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-400">
          <p>Secure authentication powered by Firebase</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;