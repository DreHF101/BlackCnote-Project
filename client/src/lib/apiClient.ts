import Environment from "@/utils/environment";
import { useWordPressApi } from "@/services/wordpressApi";

// Universal API client that works in both React and WordPress environments
export class UniversalApiClient {
  private baseUrl: string;
  private wpApi: ReturnType<typeof useWordPressApi> | null = null;

  constructor() {
    this.baseUrl = Environment.getApiBaseUrl();
    
    // Initialize WordPress API if in WordPress environment
    if (Environment.isWordPress()) {
      this.wpApi = useWordPressApi();
    }
  }

  // Generic request method that adapts to environment
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const envConfig = Environment.initializeEnvironment();
    
    // WordPress environment - use WordPress REST API
    if (envConfig.isWordPress && this.wpApi) {
      return this.handleWordPressRequest<T>(endpoint, options);
    }
    
    // React standalone environment - use Express API
    return this.handleReactRequest<T>(endpoint, options);
  }

  // Handle WordPress API requests
  private async handleWordPressRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const wpNonce = Environment.getWordPressNonce();
    const headers = {
      'Content-Type': 'application/json',
      ...(wpNonce && { 'X-WP-Nonce': wpNonce }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Handle React API requests
  private async handleReactRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Investment-specific methods
  async getInvestmentPlans() {
    if (Environment.isWordPress()) {
      return this.request('investment-plans');
    }
    return this.request('api/investment-plans');
  }

  async getUserInvestments(userId: number) {
    if (Environment.isWordPress()) {
      return this.request(`investments?user_id=${userId}`);
    }
    return this.request(`api/users/${userId}/investments`);
  }

  async createInvestment(data: any) {
    if (Environment.isWordPress()) {
      return this.request('investments', {
        method: 'POST',
        body: JSON.stringify({
          author: data.userId,
          meta: {
            plan_id: data.planId,
            amount: data.amount,
            duration_days: data.durationDays,
          },
        }),
      });
    }
    return this.request('api/investments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserData(userId: number) {
    if (Environment.isWordPress()) {
      return this.request(`users?id=${userId}`);
    }
    return this.request(`api/user/${userId}`);
  }

  async getUserTransactions(userId: number) {
    if (Environment.isWordPress()) {
      return this.request(`transactions?user_id=${userId}`);
    }
    return this.request(`api/users/${userId}/transactions`);
  }

  async getUserPortfolio(userId: number) {
    if (Environment.isWordPress()) {
      return this.request(`portfolio?user_id=${userId}`);
    }
    return this.request(`api/users/${userId}/portfolio`);
  }
}

// Export singleton instance
export const apiClient = new UniversalApiClient();

// React hook for using the API client
export const useApiClient = () => {
  return apiClient;
};

// Environment-aware query functions for React Query
export const createQueryFunctions = () => {
  const client = new UniversalApiClient();
  
  return {
    // Investment plans
    getInvestmentPlans: () => client.getInvestmentPlans(),
    
    // User investments
    getUserInvestments: (userId: number) => client.getUserInvestments(userId),
    
    // User data
    getUserData: (userId: number) => client.getUserData(userId),
    
    // User transactions
    getUserTransactions: (userId: number) => client.getUserTransactions(userId),
    
    // User portfolio
    getUserPortfolio: (userId: number) => client.getUserPortfolio(userId),
  };
};

// Export query functions
export const queryFunctions = createQueryFunctions();