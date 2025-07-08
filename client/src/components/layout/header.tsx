import { Link, useLocation } from "wouter";

export default function Header() {
  const [location] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "fas fa-tachometer-alt" },
    { name: "Investments", href: "/investments", icon: "fas fa-chart-line" },
    { name: "Analytics", href: "/analytics", icon: "fas fa-chart-bar" },
    { name: "Transactions", href: "/transactions", icon: "fas fa-exchange-alt" },
  ];

  return (
    <header className="bg-[var(--dark-card)] border-b border-[var(--dark-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-[var(--accent-blue)] rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold text-[var(--text-primary)]">BlackCnote</span>
              </Link>
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              {navigation.map((item) => {
                const isActive = location === item.href || (location === "/" && item.href === "/dashboard");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[var(--accent-blue)] border-b-2 border-[var(--accent-blue)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <i className={`${item.icon} mr-2`}></i>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2 rounded-lg hover:bg-[var(--dark-bg)] transition-colors relative">
              <i className="fas fa-bell text-lg"></i>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--loss-red)] rounded-full"></span>
            </button>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-[var(--text-primary)]">John Investor</div>
                <div className="text-xs text-[var(--text-secondary)]">Premium Plan</div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                alt="User Profile" 
                className="w-10 h-10 rounded-full border-2 border-[var(--dark-border)]"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
