import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;