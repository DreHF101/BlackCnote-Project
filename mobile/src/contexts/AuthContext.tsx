import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { ApiService } from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
  balance: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isBiometricEnabled: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  authenticateWithBiometrics: () => Promise<boolean>;
  enableBiometricAuth: () => Promise<void>;
  disableBiometricAuth: () => Promise<void>;
  checkBiometricSupport: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      const userData = await SecureStore.getItemAsync('user');
      const biometricEnabled = await SecureStore.getItemAsync('biometricEnabled');

      if (token && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
        setIsBiometricEnabled(biometricEnabled === 'true');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: { username: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await ApiService.login(credentials);
      
      if (response.token && response.user) {
        await SecureStore.setItemAsync('authToken', response.token);
        await SecureStore.setItemAsync('user', JSON.stringify(response.user));
        
        setUser(response.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setIsLoading(true);
      const response = await ApiService.register(userData);
      
      if (response.token && response.user) {
        await SecureStore.setItemAsync('authToken', response.token);
        await SecureStore.setItemAsync('user', JSON.stringify(response.user));
        
        setUser(response.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await ApiService.logout();
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('user');
      await SecureStore.deleteItemAsync('biometricEnabled');
      
      setUser(null);
      setIsAuthenticated(false);
      setIsBiometricEnabled(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const checkBiometricSupport = async (): Promise<boolean> => {
    try {
      const isAvailable = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      return isAvailable && isEnrolled;
    } catch (error) {
      console.error('Biometric check error:', error);
      return false;
    }
  };

  const authenticateWithBiometrics = async (): Promise<boolean> => {
    try {
      const isSupported = await checkBiometricSupport();
      if (!isSupported) {
        throw new Error('Biometric authentication not supported or not enrolled');
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your BlackCnote account',
        fallbackLabel: 'Use password',
        cancelLabel: 'Cancel',
      });

      return result.success;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  };

  const enableBiometricAuth = async () => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      const isSupported = await checkBiometricSupport();
      if (!isSupported) {
        throw new Error('Biometric authentication not supported');
      }

      const authenticated = await authenticateWithBiometrics();
      if (!authenticated) {
        throw new Error('Biometric authentication failed');
      }

      await ApiService.enableBiometricAuth(user.id);
      await SecureStore.setItemAsync('biometricEnabled', 'true');
      setIsBiometricEnabled(true);
    } catch (error) {
      console.error('Enable biometric auth error:', error);
      throw error;
    }
  };

  const disableBiometricAuth = async () => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      await ApiService.disableBiometricAuth(user.id);
      await SecureStore.deleteItemAsync('biometricEnabled');
      setIsBiometricEnabled(false);
    } catch (error) {
      console.error('Disable biometric auth error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    isBiometricEnabled,
    login,
    register,
    logout,
    authenticateWithBiometrics,
    enableBiometricAuth,
    disableBiometricAuth,
    checkBiometricSupport,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};