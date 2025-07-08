import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  TrendingUp,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Zap,
  Globe,
  RefreshCw,
  DollarSign,
  BarChart3,
  Award,
  Target,
  Wallet,
  PiggyBank
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Stats {
  totalUsers: number;
  totalInvested: number;
  totalPaid: number;
  activeInvestments: number;
}

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your investments are protected with military-grade encryption and multi-layer security protocols."
  },
  {
    icon: TrendingUp,
    title: "Proven Returns",
    description: "Consistent daily returns with transparent performance tracking and real-time portfolio monitoring."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support with dedicated account managers for premium investors."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Invest from anywhere in the world with multi-currency support and instant withdrawals."
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Lightning-fast deposits and withdrawals with automated processing and real-time confirmations."
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Managed by seasoned financial professionals with decades of combined investment experience."
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Entrepreneur",
    rating: 5,
    comment: "BlackCnote has transformed my investment strategy. The consistent returns and professional support are exceptional.",
    avatar: "SC"
  },
  {
    name: "Maria Johnson", 
    role: "Business Owner",
    rating: 5,
    comment: "The security and transparency of BlackCnote give me peace of mind. I've been investing for 6 months and the results are amazing.",
    avatar: "MJ"
  },
  {
    name: "David Wilson",
    role: "Retired",
    rating: 5, 
    comment: "Excellent customer support and reliable returns. BlackCnote has exceeded my expectations in every way.",
    avatar: "DW"
  }
];

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalInvested: 0,
    totalPaid: 0,
    activeInvestments: 0
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch stats from API
  const { data: statsData } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: async () => {
      // For demo purposes, return mock data since we don't have a stats endpoint yet
      return {
        totalUsers: 15420,
        totalInvested: 28475000,
        totalPaid: 31568000,
        activeInvestments: 8920
      };
    }
  });

  // Animate stats on load
  useEffect(() => {
    if (statsData) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setStats(statsData);
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [statsData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                BlackCnote
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              Your premium investment platform offering consistent daily returns with bank-level security. 
              Join thousands of successful investors building wealth with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-lg">
                  Start Investing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/investments">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900/20">
                  View Investment Plans
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Licensed & Regulated</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>15,000+ Investors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Users className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isAnimating ? "..." : formatNumber(stats.totalUsers)}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Total Investors</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isAnimating ? "..." : formatCurrency(stats.totalInvested)}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Total Invested</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Wallet className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isAnimating ? "..." : formatCurrency(stats.totalPaid)}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Total Paid Out</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isAnimating ? "..." : formatNumber(stats.activeInvestments)}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Active Investments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose BlackCnote?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the difference with our premium investment platform designed for serious investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full">
                  <feature.icon className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Plans Preview */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Investment Plans
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose from our carefully crafted investment plans designed to maximize your returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 text-center border-2 hover:border-yellow-500 transition-colors duration-300">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full">
                <PiggyBank className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Starter Plan</h3>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">2.5% Daily</div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Perfect for beginners looking to start their investment journey</p>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                <div>• Minimum: $100</div>
                <div>• Duration: 30 days</div>
                <div>• Daily returns</div>
              </div>
            </Card>

            <Card className="p-8 text-center border-2 border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Target className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Professional Plan</h3>
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">5.0% Daily</div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Ideal for experienced investors seeking higher returns</p>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                <div>• Minimum: $1,000</div>
                <div>• Duration: 60 days</div>
                <div>• Priority support</div>
              </div>
            </Card>

            <Card className="p-8 text-center border-2 hover:border-purple-500 transition-colors duration-300">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Premium Plan</h3>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">7.5% Daily</div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Exclusive plan for high-net-worth individuals</p>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                <div>• Minimum: $10,000</div>
                <div>• Duration: 90 days</div>
                <div>• Dedicated manager</div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/investments">
              <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4">
                View All Plans
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Investors Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real testimonials from our satisfied investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 bg-white dark:bg-gray-800 border-0 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full flex items-center justify-center mr-4">
                    <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of successful investors and start earning daily returns today. 
            Your financial future starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="bg-white text-yellow-600 border-white hover:bg-gray-100 px-8 py-4 text-lg">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="ghost" className="text-white border-2 border-white hover:bg-white hover:text-yellow-600 px-8 py-4 text-lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}