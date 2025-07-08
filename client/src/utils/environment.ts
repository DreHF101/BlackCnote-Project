// Environment detection and configuration utilities
export const Environment = {
  // Detect if running in WordPress environment
  isWordPress(): boolean {
    if (typeof window === 'undefined') return false;
    
    return (
      window.location.pathname.includes('/wp-admin/') ||
      window.location.pathname.includes('/wp-content/') ||
      document.querySelector('meta[name="generator"]')?.getAttribute('content')?.includes('WordPress') ||
      typeof (window as any).wp !== 'undefined' ||
      document.body.classList.contains('wp-admin') ||
      document.body.classList.contains('wordpress')
    );
  },

  // Detect if running in React standalone environment
  isReactStandalone(): boolean {
    if (typeof window === 'undefined') return true;
    
    return !this.isWordPress() && window.location.origin.includes('replit');
  },

  // Get API base URL based on environment
  getApiBaseUrl(): string {
    if (typeof window === 'undefined') return '';
    
    if (this.isWordPress()) {
      // WordPress environment - use WordPress REST API endpoints
      const wpApiSettings = (window as any).wpApiSettings;
      if (wpApiSettings && wpApiSettings.root) {
        return wpApiSettings.root.replace('/wp/v2/', '');
      }
      return `${window.location.origin}/wp-json`;
    }
    
    // React standalone environment - use Express API
    return `${window.location.origin}/api`;
  },

  // Get WordPress REST API base URL
  getWordPressApiUrl(): string {
    if (typeof window === 'undefined') return '';
    
    const wpApiSettings = (window as any).wpApiSettings;
    if (wpApiSettings && wpApiSettings.root) {
      return wpApiSettings.root;
    }
    
    return `${window.location.origin}/wp-json/wp/v2/`;
  },

  // Get authentication method based on environment
  getAuthMethod(): 'jwt' | 'session' | 'nonce' {
    if (this.isWordPress()) {
      // Check for WordPress nonce
      if (document.querySelector('meta[name="wp-rest-nonce"]')) {
        return 'nonce';
      }
      // Default to JWT for WordPress
      return 'jwt';
    }
    
    // React standalone uses session
    return 'session';
  },

  // Get WordPress nonce if available
  getWordPressNonce(): string | null {
    if (typeof window === 'undefined') return null;
    
    const nonceElement = document.querySelector('meta[name="wp-rest-nonce"]');
    if (nonceElement) {
      return nonceElement.getAttribute('content');
    }
    
    // Check for localized nonce
    const wpApiSettings = (window as any).wpApiSettings;
    if (wpApiSettings && wpApiSettings.nonce) {
      return wpApiSettings.nonce;
    }
    
    return null;
  },

  // Check if user is logged in (WordPress context)
  isWordPressUserLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    
    return (
      document.body.classList.contains('logged-in') ||
      typeof (window as any).wp !== 'undefined' ||
      !!this.getWordPressNonce()
    );
  },

  // Get current user info from WordPress
  getWordPressCurrentUser(): any {
    if (typeof window === 'undefined') return null;
    
    const wpApiSettings = (window as any).wpApiSettings;
    if (wpApiSettings && wpApiSettings.user) {
      return wpApiSettings.user;
    }
    
    return null;
  },

  // Initialize environment-specific configurations
  initializeEnvironment(): {
    apiBaseUrl: string;
    authMethod: 'jwt' | 'session' | 'nonce';
    isWordPress: boolean;
    isReactStandalone: boolean;
    wpNonce?: string;
    wpUser?: any;
  } {
    const isWordPress = this.isWordPress();
    const isReactStandalone = this.isReactStandalone();
    
    const config = {
      apiBaseUrl: this.getApiBaseUrl(),
      authMethod: this.getAuthMethod(),
      isWordPress,
      isReactStandalone,
    };
    
    // Add WordPress-specific config
    if (isWordPress) {
      return {
        ...config,
        wpNonce: this.getWordPressNonce(),
        wpUser: this.getWordPressCurrentUser(),
      };
    }
    
    return config;
  },

  // Platform-specific CSS classes
  getPlatformClasses(): string {
    const classes = ['blackcnote-platform'];
    
    if (this.isWordPress()) {
      classes.push('blackcnote-wordpress');
    } else if (this.isReactStandalone()) {
      classes.push('blackcnote-react-standalone');
    }
    
    return classes.join(' ');
  },

  // Environment-specific localStorage keys
  getStorageKeys() {
    const prefix = this.isWordPress() ? 'wp_blackcnote_' : 'blackcnote_';
    
    return {
      token: `${prefix}token`,
      user: `${prefix}user`,
      settings: `${prefix}settings`,
      cache: `${prefix}cache`,
    };
  },

  // Debug information
  getDebugInfo() {
    return {
      isWordPress: this.isWordPress(),
      isReactStandalone: this.isReactStandalone(),
      apiBaseUrl: this.getApiBaseUrl(),
      authMethod: this.getAuthMethod(),
      wpNonce: this.getWordPressNonce(),
      wpUser: this.getWordPressCurrentUser(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server',
    };
  }
};

// Export as default
export default Environment;