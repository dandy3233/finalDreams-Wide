import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface User {
  id?: string;
  email: string;
  name: string;
  role: string;
  loginTime: string;
  sessionToken?: string;
  lastActive?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: (showMessage?: boolean) => Promise<void>;
  checkAuth: () => boolean;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Session storage keys
const STORAGE_KEYS = {
  AUTH_STATE: 'dreams_wide_authenticated',
  USER_DATA: 'dreams_wide_user',
  SESSION_TOKEN: 'dreams_wide_session_token',
  LOGIN_TIMESTAMP: 'dreams_wide_login_time',
} as const;

// Session timeout (8 hours)
const SESSION_TIMEOUT = 8 * 60 * 60 * 1000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Auto-logout timer
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

  // Session activity tracking
  const updateLastActivity = () => {
    if (isAuthenticated) {
      localStorage.setItem('last_activity', new Date().toISOString());
    }
  };

  // Check session validity
  const isSessionValid = (): boolean => {
    const loginTime = localStorage.getItem(STORAGE_KEYS.LOGIN_TIMESTAMP);
    const lastActivity = localStorage.getItem('last_activity');
    
    if (!loginTime || !lastActivity) return false;
    
    const loginTimestamp = new Date(loginTime).getTime();
    const lastActivityTimestamp = new Date(lastActivity).getTime();
    const now = Date.now();
    
    // Check if session has expired (8 hours from login or 2 hours of inactivity)
    const sessionExpired = now - loginTimestamp > SESSION_TIMEOUT;
    const inactivityExpired = now - lastActivityTimestamp > (2 * 60 * 60 * 1000);
    
    return !sessionExpired && !inactivityExpired;
  };

  // Initialize authentication state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check new storage keys first
        let authState = localStorage.getItem(STORAGE_KEYS.AUTH_STATE);
        let userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);

        // Backward compatibility: check old storage keys
        if (!authState || !userData) {
          const oldAuthState = localStorage.getItem('admin_authenticated');
          const oldUserData = localStorage.getItem('admin_user');

          if (oldAuthState === 'true' && oldUserData) {
            // Migrate old data to new keys
            authState = oldAuthState;
            userData = oldUserData;

            // Store in new format
            localStorage.setItem(STORAGE_KEYS.AUTH_STATE, authState);
            localStorage.setItem(STORAGE_KEYS.USER_DATA, userData);
            localStorage.setItem(STORAGE_KEYS.LOGIN_TIMESTAMP, new Date().toISOString());
            localStorage.setItem('last_activity', new Date().toISOString());

            // Clean up old keys
            localStorage.removeItem('admin_authenticated');
            localStorage.removeItem('admin_user');
          }
        }

        if (authState === 'true' && userData) {
          const parsedUser = JSON.parse(userData);

          // Temporarily skip session validation for debugging
          console.log('Found existing auth data, setting user:', parsedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          updateLastActivity();
          // setupAutoLogout(); // Temporarily disabled
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        await clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Setup auto-logout timer
  const setupAutoLogout = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    const timer = setTimeout(async () => {
      await handleLogout(true, 'Session expired due to inactivity');
    }, 2 * 60 * 60 * 1000); // 2 hours

    setLogoutTimer(timer);
  };

  // Activity listeners for session refresh
  useEffect(() => {
    if (isAuthenticated) {
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      
      const activityHandler = () => {
        updateLastActivity();
        setupAutoLogout(); // Reset the timer
      };

      events.forEach(event => {
        document.addEventListener(event, activityHandler, true);
      });

      return () => {
        events.forEach(event => {
          document.removeEventListener(event, activityHandler, true);
        });
        if (logoutTimer) {
          clearTimeout(logoutTimer);
        }
      };
    }
  }, [isAuthenticated, logoutTimer]);

  const checkAuth = (): boolean => {
    const authState = localStorage.getItem(STORAGE_KEYS.AUTH_STATE);
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);

    if (authState === 'true' && userData) {
      try {
        JSON.parse(userData);
        return isSessionValid();
      } catch (error) {
        return false;
      }
    }
    return false;
  };

  const clearAuthData = async () => {
    // Clear all auth-related data
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    localStorage.removeItem('last_activity');
    
    setUser(null);
    setIsAuthenticated(false);
    
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      setLogoutTimer(null);
    }
  };

  const login = (userData: User) => {
    try {
      console.log('AuthContext login called with:', userData);

      const loginTime = new Date().toISOString();
      const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const enhancedUserData = {
        ...userData,
        loginTime,
        sessionToken,
        lastActive: loginTime,
      };

      console.log('Enhanced user data:', enhancedUserData);

      // Store auth data
      localStorage.setItem(STORAGE_KEYS.AUTH_STATE, 'true');
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(enhancedUserData));
      localStorage.setItem(STORAGE_KEYS.SESSION_TOKEN, sessionToken);
      localStorage.setItem(STORAGE_KEYS.LOGIN_TIMESTAMP, loginTime);
      localStorage.setItem('last_activity', loginTime);

      console.log('Stored data in localStorage, setting auth state...');

      setUser(enhancedUserData);
      setIsAuthenticated(true);
      // setupAutoLogout(); // Temporarily disabled for debugging

      console.log('Auth state updated, showing success toast...');

      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`,
      });

    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async (showMessage: boolean = true, customMessage?: string) => {
    try {
      // Clear all auth data
      await clearAuthData();

      // Show logout message if requested
      if (showMessage) {
        toast({
          title: "Logged Out",
          description: customMessage || "You have been successfully logged out",
          variant: customMessage ? "destructive" : "default",
        });
      }

    } catch (error) {
      console.error('Logout error:', error);
      if (showMessage) {
        toast({
          title: "Logout Error",
          description: "An error occurred during logout",
          variant: "destructive",
        });
      }
    }
  };

  const logout = async (showMessage: boolean = true) => {
    await handleLogout(showMessage);
  };

  const refreshSession = () => {
    if (isAuthenticated && user) {
      updateLastActivity();
      setupAutoLogout();
      
      // Update user data with new timestamp
      const updatedUser = {
        ...user,
        lastActive: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    checkAuth,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook for logout confirmation
export const useLogoutConfirmation = () => {
  const { logout } = useAuth();
  
  const confirmLogout = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to log out? Any unsaved changes will be lost.'
    );
    
    if (confirmed) {
      await logout(true);
    }
    
    return confirmed;
  };

  return { confirmLogout };
};

// Session status hook
export const useSessionStatus = () => {
  const { isAuthenticated, user } = useAuth();
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const updateTimeRemaining = () => {
      const lastActivity = localStorage.getItem('last_activity');
      if (lastActivity) {
        const lastActivityTime = new Date(lastActivity).getTime();
        const timeRemaining = (2 * 60 * 60 * 1000) - (Date.now() - lastActivityTime);
        setSessionTimeRemaining(Math.max(0, timeRemaining));
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  return {
    sessionTimeRemaining,
    sessionTimeRemainingFormatted: sessionTimeRemaining 
      ? Math.ceil(sessionTimeRemaining / (60 * 1000)) 
      : null,
  };
};
