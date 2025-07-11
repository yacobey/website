import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { username: string } | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('admin_token');
    const expires = localStorage.getItem('admin_expires');
    
    if (!token || !expires) {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
      return;
    }

    // Check if token is expired
    const expirationTime = new Date(expires).getTime();
    const currentTime = new Date().getTime();
    
    if (currentTime > expirationTime) {
      // Token expired, clear storage
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_expires');
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
      return;
    }

    // Token is valid
    setAuthState({
      isAuthenticated: true,
      isLoading: false,
      user: { username: 'admin' },
    });
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_expires');
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
    });
  };

  return {
    ...authState,
    logout,
    checkAuthStatus,
  };
}