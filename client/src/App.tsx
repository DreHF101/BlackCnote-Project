import React, { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Import pages with error handling
const Home = React.lazy(() => import("@/pages/test-home").catch(() => import("@/pages/home").catch(() => ({ default: () => <div>Loading...</div> }))));
const Dashboard = React.lazy(() => import("@/pages/dashboard").catch(() => ({ default: () => <div>Loading...</div> })));
const Investments = React.lazy(() => import("@/pages/investments").catch(() => ({ default: () => <div>Loading...</div> })));
const Analytics = React.lazy(() => import("@/pages/analytics").catch(() => ({ default: () => <div>Loading...</div> })));
const Transactions = React.lazy(() => import("@/pages/transactions").catch(() => ({ default: () => <div>Loading...</div> })));
const About = React.lazy(() => import("@/pages/about").catch(() => ({ default: () => <div>Loading...</div> })));
const Contact = React.lazy(() => import("@/pages/contact").catch(() => ({ default: () => <div>Loading...</div> })));
const Calculator = React.lazy(() => import("@/pages/calculator").catch(() => ({ default: () => <div>Loading...</div> })));
const Login = React.lazy(() => import("@/pages/login").catch(() => ({ default: () => <div>Loading...</div> })));
const Register = React.lazy(() => import("@/pages/register").catch(() => ({ default: () => <div>Loading...</div> })));
const Help = React.lazy(() => import("@/pages/help").catch(() => ({ default: () => <div>Loading...</div> })));
const Referrals = React.lazy(() => import("@/pages/referrals").catch(() => ({ default: () => <div>Loading...</div> })));
const News = React.lazy(() => import("@/pages/news").catch(() => ({ default: () => <div>Loading...</div> })));
const AIAssistant = React.lazy(() => import("@/pages/ai-assistant").catch(() => ({ default: () => <div>Loading...</div> })));
const Security = React.lazy(() => import("@/pages/security").catch(() => ({ default: () => <div>Loading...</div> })));
const Withdraw = React.lazy(() => import("@/pages/withdraw").catch(() => ({ default: () => <div>Loading...</div> })));
const Deposits = React.lazy(() => import("@/pages/deposits").catch(() => ({ default: () => <div>Loading...</div> })));
const Profile = React.lazy(() => import("@/pages/profile").catch(() => ({ default: () => <div>Loading...</div> })));

// Import components with fallbacks
let Header, Footer, OnboardingTutorial, WordPressIntegrationProvider, Environment;

try {
  Header = require("@/components/ui/header").Header;
} catch {
  Header = () => <div className="h-16 bg-slate-900 border-b border-slate-800"></div>;
}

try {
  Footer = require("@/components/ui/footer").Footer;
} catch {
  Footer = () => <div className="h-16 bg-slate-900 border-t border-slate-800"></div>;
}

try {
  OnboardingTutorial = require("@/components/onboarding/onboarding-tutorial").OnboardingTutorial;
} catch {
  OnboardingTutorial = () => null;
}

try {
  WordPressIntegrationProvider = require("@/components/wordpress/WordPressShortcodes").WordPressIntegrationProvider;
} catch {
  WordPressIntegrationProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
}

try {
  Environment = require("@/utils/environment").default;
} catch {
  Environment = {
    initializeEnvironment: () => ({ apiBaseUrl: '/api', authMethod: 'session', isWordPress: false, isReactStandalone: true }),
    getPlatformClasses: () => 'blackcnote-react-standalone'
  };
}

function Router() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full"></div></div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/investments" component={Investments} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/help" component={Help} />
        <Route path="/referrals" component={Referrals} />
        <Route path="/news" component={News} />
        <Route path="/ai-assistant" component={AIAssistant} />
        <Route path="/security" component={Security} />
        <Route path="/withdraw" component={Withdraw} />
        <Route path="/deposits" component={Deposits} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </React.Suspense>
  );
}

function App() {
  // Initialize environment configuration
  const envConfig = Environment.initializeEnvironment();
  
  // State for authentication and onboarding
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar?: string;
  } | null>(null);

  // Check if user is new and should see onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('blackcnote_onboarding_completed');
    const isLoggedIn = localStorage.getItem('blackcnote_user');
    
    if (isLoggedIn && !hasSeenOnboarding) {
      setShowOnboarding(true);
    }
    
    if (isLoggedIn) {
      setIsAuthenticated(true);
      setUser({
        name: 'John Doe',
        email: 'john@example.com',
        avatar: undefined
      });
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('blackcnote_onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('blackcnote_user');
    localStorage.removeItem('blackcnote_onboarding_completed');
    setIsAuthenticated(false);
    setUser(null);
  };
  
  return (
    <div className={`dark min-h-screen bg-[var(--dark-bg)] text-[var(--text-primary)] ${Environment.getPlatformClasses()}`}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WordPressIntegrationProvider>
            {/* Add environment indicator for development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="fixed top-0 right-0 z-50 bg-yellow-500 text-black px-2 py-1 text-xs">
                {envConfig.isWordPress ? 'WordPress' : 'React'} Mode
              </div>
            )}
            
            <div className="min-h-screen flex flex-col">
              <Header 
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout}
              />
              
              <main className="flex-1">
                <Router />
              </main>
              
              <Footer />
            </div>
            
            <OnboardingTutorial
              isOpen={showOnboarding}
              onClose={() => setShowOnboarding(false)}
              onComplete={handleOnboardingComplete}
              userType="new"
            />
            
            <Toaster />
          </WordPressIntegrationProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
