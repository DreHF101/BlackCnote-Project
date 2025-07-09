import React, { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

// Import core components with fallbacks
let Toaster, TooltipProvider, Header, Footer;

try {
  const toasterModule = require("@/components/ui/toaster");
  Toaster = toasterModule.Toaster;
} catch {
  Toaster = () => null;
}

try {
  const tooltipModule = require("@/components/ui/tooltip");
  TooltipProvider = tooltipModule.TooltipProvider;
} catch {
  TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
}

try {
  const headerModule = require("@/components/ui/header");
  Header = headerModule.Header;
} catch {
  Header = ({ isAuthenticated, user, onLogout }: any) => (
    <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">BC</span>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
          BlackCnote
        </span>
      </div>
      
      <nav className="hidden md:flex items-center space-x-6">
        <a href="/" className="text-slate-300 hover:text-white transition-colors">Home</a>
        <a href="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</a>
        <a href="/investments" className="text-slate-300 hover:text-white transition-colors">Investments</a>
        <a href="/calculator" className="text-slate-300 hover:text-white transition-colors">Calculator</a>
        <a href="/news" className="text-slate-300 hover:text-white transition-colors">News</a>
      </nav>
      
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-slate-400">Welcome, {user?.name}</span>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <a href="/login" className="text-slate-300 hover:text-white transition-colors">Login</a>
            <a
              href="/register"
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-600 hover:from-amber-500 hover:to-orange-700 rounded-lg text-sm transition-colors"
            >
              Sign Up
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

try {
  const footerModule = require("@/components/ui/footer");
  Footer = footerModule.Footer;
} catch {
  Footer = () => (
    <div className="h-16 bg-slate-900 border-t border-slate-800 flex items-center justify-center">
      <p className="text-slate-400">© 2025 BlackCnote. All rights reserved.</p>
    </div>
  );
}

// Import pages with fallbacks
const NotFound = React.lazy(() => 
  import("@/pages/not-found").catch(() => ({ 
    default: () => (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-slate-400">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }))
);

const Home = React.lazy(() => 
  import("@/pages/home").catch(() => ({ 
    default: () => (
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Hero Section */}
        <div className="flex items-center justify-center min-h-[80vh] px-6">
          <div className="text-center space-y-8 max-w-4xl">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto shadow-2xl">
              <span className="text-white font-bold text-3xl">BC</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
              BlackCnote Investment Platform
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              The most advanced AI-powered investment platform with dynamic APY rates, 
              smart portfolio management, and comprehensive security features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <a
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-600 hover:from-amber-500 hover:to-orange-700 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Start Investing Now
              </a>
              <a
                href="/calculator"
                className="px-8 py-4 border border-slate-700 hover:border-amber-400 rounded-xl text-lg font-semibold transition-all hover:bg-slate-800"
              >
                Calculate Returns
              </a>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="py-16 px-6 bg-slate-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Platform Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 text-center border border-slate-700 hover:border-amber-400 transition-colors">
                <div className="text-3xl font-bold text-green-400 mb-2">$12,450</div>
                <div className="text-slate-400">Total Invested</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 text-center border border-slate-700 hover:border-blue-400 transition-colors">
                <div className="text-3xl font-bold text-blue-400 mb-2">$2,180</div>
                <div className="text-slate-400">Total Profit</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 text-center border border-slate-700 hover:border-amber-400 transition-colors">
                <div className="text-3xl font-bold text-amber-400 mb-2">5</div>
                <div className="text-slate-400">Active Plans</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 text-center border border-slate-700 hover:border-purple-400 transition-colors">
                <div className="text-3xl font-bold text-purple-400 mb-2">17.5%</div>
                <div className="text-slate-400">Average ROI</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Why Choose BlackCnote?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">AI</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Recommendations</h3>
                <p className="text-slate-400">Smart investment suggestions based on market analysis and your portfolio performance.</p>
              </div>
              
              <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Advanced Security</h3>
                <p className="text-slate-400">Two-factor authentication, biometric login, and comprehensive fraud protection.</p>
              </div>
              
              <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">📊</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Dynamic APY Rates</h3>
                <p className="text-slate-400">Performance-based rates that adjust automatically based on market conditions and loyalty.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }))
);

const Dashboard = React.lazy(() => 
  import("@/pages/dashboard").catch(() => ({ 
    default: () => (
      <div className="min-h-screen bg-slate-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-slate-400">Loading dashboard components...</p>
      </div>
    )
  }))
);

const Investments = React.lazy(() => 
  import("@/pages/investments").catch(() => ({ 
    default: () => (
      <div className="min-h-screen bg-slate-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Investment Plans</h1>
        <p className="text-slate-400">Loading investment plans...</p>
      </div>
    )
  }))
);

function Router() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full"></div>
      </div>
    }>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/investments" component={Investments} />
        <Route path="/login" component={() => <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center"><div>Login Page Loading...</div></div>} />
        <Route path="/register" component={() => <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center"><div>Register Page Loading...</div></div>} />
        <Route path="/calculator" component={() => <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center"><div>Calculator Page Loading...</div></div>} />
        <Route path="/news" component={() => <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center"><div>News Page Loading...</div></div>} />
        <Route component={NotFound} />
      </Switch>
    </React.Suspense>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar?: string;
  } | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('blackcnote_user');
    if (isLoggedIn) {
      setIsAuthenticated(true);
      setUser({
        name: 'John Doe',
        email: 'john@example.com',
        avatar: undefined
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('blackcnote_user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <div className="dark min-h-screen bg-slate-900 text-white">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
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
          
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
