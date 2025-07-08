import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import { WordPressIntegrationProvider } from "@/components/wordpress/WordPressShortcodes";
import Environment from "@/utils/environment";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize environment configuration
  const envConfig = Environment.initializeEnvironment();
  
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
            <Toaster />
            <Router />
          </WordPressIntegrationProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
