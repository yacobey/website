import { useState, useEffect, useCallback } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { username: string } | null;
}

export function getAdminAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('admin_token');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem('admin_token');
    const expires = localStorage.getItem('admin_expires');

    if (!token || !expires) {
      setAuthState({ isAuthenticated: false, isLoading: false, user: null });
      return;
    }

    const expirationTime = new Date(expires).getTime();
    if (Date.now() > expirationTime) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_expires');
      setAuthState({ isAuthenticated: false, isLoading: false, user: null });
      return;
    }

    try {
      const response = await fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setAuthState({ isAuthenticated: true, isLoading: false, user: { username: 'admin' } });
      } else {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_expires');
        setAuthState({ isAuthenticated: false, isLoading: false, user: null });
      }
    } catch {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_expires');
      setAuthState({ isAuthenticated: false, isLoading: false, user: null });
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const logout = async () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // ignore network errors on logout
      }
    }
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_expires');
    setAuthState({ isAuthenticated: false, isLoading: false, user: null });
  };

  return {
    ...authState,
    logout,
    checkAuthStatus,
  };
}
