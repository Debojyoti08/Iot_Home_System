import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false,
  className = '' 
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg shadow-gray-500/25',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;