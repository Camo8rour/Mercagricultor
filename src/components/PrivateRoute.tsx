import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: 'buyer' | 'seller';
}

export function PrivateRoute({ children, role }: PrivateRouteProps) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}