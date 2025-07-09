import React, { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { OnboardingTutorial } from "@/components/onboarding/onboarding-tutorial";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Investments from "@/pages/investments";
import Analytics from "@/pages/analytics";
import Transactions from "@/pages/transactions";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Calculator from "@/pages/calculator";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Help from "@/pages/help";
import Referrals from "@/pages/referrals";
import News from "@/pages/news";
import AIAssistant from "@/pages/ai-assistant";
import Security from "@/pages/security";
import { WordPressIntegrationProvider } from "@/components/wordpress/WordPressShortcodes";
import Environment from "@/utils/environment";

function Router() {
  return (
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
      <Route component={NotFound} />
    </Switch>
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
