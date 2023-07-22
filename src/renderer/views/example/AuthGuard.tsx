import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

interface AuthGuardProps {
  children?: React.ReactNode;
  [keyof: string]: any;
}
// This is a mock function that checks if a user is authenticated.
// Replace this with your actual authentication check.
const isAuthenticated = () => {
  // return true or false based on your authentication logic
  return Math.random() < 0.5;
};
const AuthGuard: React.FC<AuthGuardProps> = () => {
  if (!isAuthenticated()) {
    // If the user is not authenticated, redirect to the login page.
    return <Navigate to="/example/403" replace />;
  }

  // If the user is authenticated, render the children components.
  return <Outlet />;
};

export default AuthGuard;
