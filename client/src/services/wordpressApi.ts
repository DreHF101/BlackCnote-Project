import { apiRequest } from "@lib/queryClient";

// WordPress REST API compatibility service
export class WordPressApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl || window.location.origin;
  }

  // JWT Authentication
  async authenticate(username: string, password: string) {
    try {
      const response = await fetch(`${this.baseUrl}/wp-json/jwt-auth/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      this.token = data.token;
      localStorage.setItem('wp_token', data.token);
      return data;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }

  // Get stored token
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('wp_token');
    }
    return this.token;
  }

  // Clear token
  clearToken() {
    this.token = null;
    localStorage.removeItem('wp_token');
  }

  // Generic WordPress API request
  async wpRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`WordPress API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Get investments (WordPress format)
  async getInvestments(userId?: number, page = 1, perPage = 10) {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      ...(userId && { user_id: userId.toString() }),
    });

    return this.wpRequest(`investments?${params}`);
  }

  // Get investment plans (WordPress format)
  async getInvestmentPlans() {
    return this.wpRequest('investment-plans');
  }

  // Get user data (WordPress format)
  async getUserData(userId: number) {
    return this.wpRequest(`users?id=${userId}`);
  }

  // Create investment (WordPress format)
  async createInvestment(investmentData: {
    planId: number;
    amount: string;
    userId: number;
    durationDays: number;
  }) {
    return this.wpRequest('investments', {
      method: 'POST',
      body: JSON.stringify({
        author: investmentData.userId,
        status: 'publish',
        meta: {
          plan_id: investmentData.planId,
          amount: investmentData.amount,
          duration_days: investmentData.durationDays,
        },
      }),
    });
  }

  // Convert WordPress post to standard format
  convertWpPost(wpPost: any) {
    return {
      id: wpPost.id,
      title: wpPost.title.rendered,
      content: wpPost.content.rendered,
      excerpt: wpPost.excerpt.rendered,
      date: wpPost.date,
      author: wpPost.author,
      meta: wpPost.meta,
      status: wpPost.status,
    };
  }

  // Convert WordPress investment to standard format
  convertWpInvestment(wpInvestment: any) {
    return {
      id: wpInvestment.id,
      userId: wpInvestment.author,
      planId: wpInvestment.meta.plan_id,
      amount: wpInvestment.meta.amount,
      currentReturns: wpInvestment.meta.current_returns || '0.00',
      status: wpInvestment.status === 'publish' ? 'active' : 'inactive',
      startDate: wpInvestment.meta.start_date || wpInvestment.date,
      endDate: wpInvestment.meta.end_date,
    };
  }

  // Convert WordPress user to standard format
  convertWpUser(wpUser: any) {
    return {
      id: wpUser.id,
      username: wpUser.username,
      email: wpUser.email,
      balance: wpUser.meta.balance || '0.00',
      createdAt: wpUser.registered_date,
    };
  }
}

// WordPress API hooks for React components
export const useWordPressApi = () => {
  const wpApi = new WordPressApiService();

  return {
    // Authentication
    authenticate: wpApi.authenticate.bind(wpApi),
    getToken: wpApi.getToken.bind(wpApi),
    clearToken: wpApi.clearToken.bind(wpApi),

    // Data fetching
    getInvestments: wpApi.getInvestments.bind(wpApi),
    getInvestmentPlans: wpApi.getInvestmentPlans.bind(wpApi),
    getUserData: wpApi.getUserData.bind(wpApi),
    createInvestment: wpApi.createInvestment.bind(wpApi),

    // Converters
    convertWpPost: wpApi.convertWpPost.bind(wpApi),
    convertWpInvestment: wpApi.convertWpInvestment.bind(wpApi),
    convertWpUser: wpApi.convertWpUser.bind(wpApi),
  };
};

// WordPress integration utility
export const WordPressIntegration = {
  // Check if running in WordPress environment
  isWordPressEnvironment(): boolean {
    return typeof window !== 'undefined' && 
           (window.location.pathname.includes('/wp-admin/') || 
            window.location.pathname.includes('/wp-content/') ||
            document.querySelector('meta[name="generator"]')?.getAttribute('content')?.includes('WordPress'));
  },

  // Get WordPress REST API base URL
  getWpApiBase(): string {
    if (typeof window !== 'undefined') {
      // Try to get from WordPress localized script
      const wpApiSettings = (window as any).wpApiSettings;
      if (wpApiSettings && wpApiSettings.root) {
        return wpApiSettings.root;
      }
      
      // Fallback to standard WordPress REST API path
      return `${window.location.origin}/wp-json/wp/v2/`;
    }
    return '/wp-json/wp/v2/';
  },

  // Initialize WordPress compatibility
  async initWordPressCompatibility() {
    if (this.isWordPressEnvironment()) {
      console.log('WordPress environment detected, initializing compatibility mode...');
      
      // Set up WordPress-specific configurations
      const wpApi = new WordPressApiService(this.getWpApiBase());
      
      // Check for existing WordPress authentication
      const wpNonce = document.querySelector('meta[name="wp-rest-nonce"]')?.getAttribute('content');
      if (wpNonce) {
        localStorage.setItem('wp_nonce', wpNonce);
      }
      
      return wpApi;
    }
    
    return null;
  },

  // Handle WordPress shortcode integration
  processShortcodes(content: string): string {
    // Process BlackCnote shortcodes
    return content
      .replace(/\[blackcnote-investments\]/g, '<div id="blackcnote-investments"></div>')
      .replace(/\[blackcnote-calculator\]/g, '<div id="blackcnote-calculator"></div>')
      .replace(/\[blackcnote-dashboard\]/g, '<div id="blackcnote-dashboard"></div>')
      .replace(/\[blackcnote-plans\]/g, '<div id="blackcnote-plans"></div>');
  }
};