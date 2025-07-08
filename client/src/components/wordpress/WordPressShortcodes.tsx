import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useWordPressApi } from '../../services/wordpressApi';
import Dashboard from '../../pages/dashboard';
import InvestmentCalculator from '../../pages/calculator';
import Investments from '../../pages/investments';
import InvestmentPlans from '../../components/dashboard/investment-plans';

// WordPress shortcode components
export const WordPressShortcodes = {
  // [blackcnote-dashboard] shortcode
  Dashboard: () => {
    const wpApi = useWordPressApi();
    const isWpEnv = typeof window !== 'undefined' && 
                    window.location.pathname.includes('/wp-');

    if (isWpEnv) {
      return (
        <div className="blackcnote-wordpress-dashboard">
          <Dashboard />
        </div>
      );
    }
    
    return <Dashboard />;
  },

  // [blackcnote-calculator] shortcode
  Calculator: () => {
    const wpApi = useWordPressApi();
    const isWpEnv = typeof window !== 'undefined' && 
                    window.location.pathname.includes('/wp-');

    if (isWpEnv) {
      return (
        <div className="blackcnote-wordpress-calculator">
          <InvestmentCalculator />
        </div>
      );
    }
    
    return <InvestmentCalculator />;
  },

  // [blackcnote-investments] shortcode
  Investments: () => {
    const wpApi = useWordPressApi();
    const isWpEnv = typeof window !== 'undefined' && 
                    window.location.pathname.includes('/wp-');

    if (isWpEnv) {
      return (
        <div className="blackcnote-wordpress-investments">
          <Investments />
        </div>
      );
    }
    
    return <Investments />;
  },

  // [blackcnote-plans] shortcode
  Plans: () => {
    const wpApi = useWordPressApi();
    const { data: plans } = useQuery({
      queryKey: ['investment-plans'],
      queryFn: () => wpApi.getInvestmentPlans(),
    });

    const isWpEnv = typeof window !== 'undefined' && 
                    window.location.pathname.includes('/wp-');

    if (isWpEnv && plans) {
      const convertedPlans = plans.map((plan: any) => ({
        id: plan.id,
        name: plan.title.rendered,
        description: plan.excerpt.rendered,
        apyRate: plan.meta.apy_rate,
        minimumAmount: plan.meta.minimum_amount,
        maximumAmount: plan.meta.maximum_amount,
        durationDays: plan.meta.duration_days,
        isActive: plan.status === 'publish'
      }));

      return (
        <div className="blackcnote-wordpress-plans">
          <InvestmentPlans plans={convertedPlans} />
        </div>
      );
    }
    
    return null;
  }
};

// WordPress shortcode initialization
export const initWordPressShortcodes = () => {
  if (typeof window === 'undefined') return;

  // Auto-initialize shortcodes when DOM is ready
  const initShortcodes = () => {
    // Dashboard shortcode
    const dashboardElements = document.querySelectorAll('#blackcnote-dashboard');
    dashboardElements.forEach(element => {
      if (!element.hasAttribute('data-initialized')) {
        element.setAttribute('data-initialized', 'true');
        // Mount React component here
        console.log('Initializing BlackCnote Dashboard shortcode');
      }
    });

    // Calculator shortcode
    const calculatorElements = document.querySelectorAll('#blackcnote-calculator');
    calculatorElements.forEach(element => {
      if (!element.hasAttribute('data-initialized')) {
        element.setAttribute('data-initialized', 'true');
        console.log('Initializing BlackCnote Calculator shortcode');
      }
    });

    // Investments shortcode
    const investmentElements = document.querySelectorAll('#blackcnote-investments');
    investmentElements.forEach(element => {
      if (!element.hasAttribute('data-initialized')) {
        element.setAttribute('data-initialized', 'true');
        console.log('Initializing BlackCnote Investments shortcode');
      }
    });

    // Plans shortcode
    const planElements = document.querySelectorAll('#blackcnote-plans');
    planElements.forEach(element => {
      if (!element.hasAttribute('data-initialized')) {
        element.setAttribute('data-initialized', 'true');
        console.log('Initializing BlackCnote Plans shortcode');
      }
    });
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShortcodes);
  } else {
    initShortcodes();
  }

  // Also initialize on WordPress page loads
  if (typeof window !== 'undefined' && (window as any).jQuery) {
    (window as any).jQuery(document).ready(initShortcodes);
  }
};

// WordPress integration component
export const WordPressIntegrationProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    initWordPressShortcodes();
  }, []);

  return <>{children}</>;
};

// Export for WordPress global access
if (typeof window !== 'undefined') {
  (window as any).BlackCnoteShortcodes = WordPressShortcodes;
  (window as any).initBlackCnoteShortcodes = initWordPressShortcodes;
}