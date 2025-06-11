import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/Dashboard';
import RoomDashboard from './pages/RoomDashboard'; 

const App = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={currentUser ? <Navigate to="/dashboard" /> : <LoginForm />} 
      />
      <Route 
        path="/signup" 
        element={currentUser ? <Navigate to="/dashboard" /> : <SignupForm />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/room/:roomId" 
        element={
          <ProtectedRoute>
            <RoomDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/" 
        element={<Navigate to={currentUser ? "/dashboard" : "/login"} />} 
      />
    </Routes>
  );
};

export default App;
