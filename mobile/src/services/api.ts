import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

// API Configuration
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5000' 
  : 'https://blackcnote-investment.replit.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('user');
    }
    return Promise.reject(error);
  }
);

// API Service Class
export class ApiService {
  // Authentication
  static async login(credentials: { username: string; password: string }) {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  }

  static async register(userData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  }

  static async logout() {
    await api.post('/api/auth/logout');
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('user');
  }

  // User Management
  static async getUserProfile(userId: number) {
    const response = await api.get(`/api/user/${userId}`);
    return response.data;
  }

  static async updateUserProfile(userId: number, userData: any) {
    const response = await api.put(`/api/user/${userId}`, userData);
    return response.data;
  }

  static async getUserPortfolio(userId: number) {
    const response = await api.get(`/api/users/${userId}/portfolio`);
    return response.data;
  }

  // Investment Plans
  static async getInvestmentPlans() {
    const response = await api.get('/api/investment-plans');
    return response.data;
  }

  static async getInvestmentPlan(planId: number) {
    const response = await api.get(`/api/investment-plans/${planId}`);
    return response.data;
  }

  // Investments
  static async getUserInvestments(userId: number) {
    const response = await api.get(`/api/users/${userId}/investments`);
    return response.data;
  }

  static async createInvestment(investmentData: {
    userId: number;
    planId: number;
    amount: string;
  }) {
    const response = await api.post('/api/investments', investmentData);
    return response.data;
  }

  static async getInvestment(investmentId: number) {
    const response = await api.get(`/api/investments/${investmentId}`);
    return response.data;
  }

  // Transactions
  static async getUserTransactions(userId: number) {
    const response = await api.get(`/api/users/${userId}/transactions`);
    return response.data;
  }

  static async createTransaction(transactionData: {
    userId: number;
    type: string;
    amount: string;
    description: string;
  }) {
    const response = await api.post('/api/transactions', transactionData);
    return response.data;
  }

  // Portfolio History
  static async getUserPortfolioHistory(userId: number) {
    const response = await api.get(`/api/users/${userId}/portfolio-history`);
    return response.data;
  }

  // Statistics
  static async getStatistics() {
    const response = await api.get('/api/statistics');
    return response.data;
  }

  // News
  static async getNews() {
    const response = await api.get('/api/news');
    return response.data;
  }

  // Referrals
  static async getUserReferrals(userId: number) {
    const response = await api.get(`/api/users/${userId}/referrals`);
    return response.data;
  }

  static async createReferral(referralData: {
    userId: number;
    referredUserId: number;
    commissionRate: string;
  }) {
    const response = await api.post('/api/referrals', referralData);
    return response.data;
  }

  // Notifications
  static async getUserNotifications(userId: number) {
    const response = await api.get(`/api/users/${userId}/notifications`);
    return response.data;
  }

  static async markNotificationAsRead(notificationId: number) {
    const response = await api.put(`/api/notifications/${notificationId}/read`);
    return response.data;
  }

  // Settings
  static async getUserSettings(userId: number) {
    const response = await api.get(`/api/users/${userId}/settings`);
    return response.data;
  }

  static async updateUserSettings(userId: number, settings: any) {
    const response = await api.put(`/api/users/${userId}/settings`, settings);
    return response.data;
  }

  // Biometric Authentication
  static async enableBiometricAuth(userId: number) {
    const response = await api.post(`/api/users/${userId}/biometric/enable`);
    return response.data;
  }

  static async disableBiometricAuth(userId: number) {
    const response = await api.post(`/api/users/${userId}/biometric/disable`);
    return response.data;
  }

  // Security
  static async changePassword(userId: number, passwordData: {
    currentPassword: string;
    newPassword: string;
  }) {
    const response = await api.put(`/api/users/${userId}/password`, passwordData);
    return response.data;
  }

  static async enableTwoFactorAuth(userId: number) {
    const response = await api.post(`/api/users/${userId}/2fa/enable`);
    return response.data;
  }

  static async disableTwoFactorAuth(userId: number) {
    const response = await api.post(`/api/users/${userId}/2fa/disable`);
    return response.data;
  }
}

export default api;