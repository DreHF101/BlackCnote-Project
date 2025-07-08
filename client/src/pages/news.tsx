import Header from "@/components/layout/header";
import { Calendar, User, Eye, MessageSquare, TrendingUp, Bell, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All News" },
    { value: "platform", label: "Platform Updates" },
    { value: "market", label: "Market Analysis" },
    { value: "investment", label: "Investment Tips" },
    { value: "company", label: "Company News" },
    { value: "security", label: "Security Updates" }
  ];

  const featuredArticle = {
    id: 1,
    title: "BlackCnote Launches Revolutionary AI-Powered Investment Strategy",
    excerpt: "Our new artificial intelligence system analyzes market trends in real-time to optimize investment returns for all our clients. This groundbreaking technology represents a major step forward in automated investment management.",
    content: "Today marks a significant milestone for BlackCnote as we introduce our proprietary AI investment system...",
    author: "BlackCnote Team",
    date: "2024-01-15",
    category: "Platform Updates",
    readTime: "5 min read",
    views: 2847,
    comments: 23,
    image: "/api/placeholder/800/400",
    featured: true
  };

  const newsArticles = [
    {
      id: 2,
      title: "Q4 2024 Performance Report: Record Returns for Investors",
      excerpt: "BlackCnote achieved unprecedented performance in Q4 2024, with average returns exceeding 18% across all investment plans.",
      author: "Investment Team",
      date: "2024-01-12",
      category: "Company News",
      readTime: "3 min read",
      views: 1934,
      comments: 15,
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Market Analysis: Cryptocurrency Trends for 2024",
      excerpt: "Our expert analysis reveals key trends and opportunities in the cryptocurrency market for the coming year.",
      author: "Market Analysts",
      date: "2024-01-10",
      category: "Market Analysis",
      readTime: "7 min read",
      views: 3241,
      comments: 42,
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Enhanced Security Measures Now Active",
      excerpt: "We've implemented advanced security protocols including multi-signature wallets and real-time fraud detection.",
      author: "Security Team",
      date: "2024-01-08",
      category: "Security Updates",
      readTime: "4 min read",
      views: 1567,
      comments: 8,
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Investment Diversification: A Beginner's Guide",
      excerpt: "Learn how to spread your investments across different asset classes to minimize risk and maximize returns.",
      author: "Education Team",
      date: "2024-01-05",
      category: "Investment Tips",
      readTime: "6 min read",
      views: 2156,
      comments: 31,
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "New Mobile App Features Rolling Out",
      excerpt: "Our latest mobile app update includes dark mode, push notifications, and advanced portfolio analytics.",
      author: "Development Team",
      date: "2024-01-03",
      category: "Platform Updates",
      readTime: "2 min read",
      views: 987,
      comments: 12,
      image: "/api/placeholder/400/250"
    },
    {
      id: 7,
      title: "Global Economic Outlook: Opportunities Ahead",
      excerpt: "Despite market uncertainties, our research identifies several promising investment opportunities for 2024.",
      author: "Research Team",
      date: "2024-01-01",
      category: "Market Analysis",
      readTime: "8 min read",
      views: 4523,
      comments: 67,
      image: "/api/placeholder/400/250"
    }
  ];

  const filteredArticles = selectedCategory === "all" 
    ? newsArticles 
    : newsArticles.filter(article => 
        article.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'platform updates': return 'bg-blue-600';
      case 'market analysis': return 'bg-green-600';
      case 'investment tips': return 'bg-purple-600';
      case 'company news': return 'bg-yellow-600';
      case 'security updates': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            BlackCnote <span className="text-blue-400">News</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest news, market insights, platform updates, 
            and investment strategies from the BlackCnote team.
          </p>
        </div>

        {/* Newsletter Subscription */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-16">
          <CardContent className="p-8 text-center">
            <Bell className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Never Miss an Update</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest news, market analysis, 
              and investment insights delivered directly to your inbox.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-l-none px-8">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Article */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-12 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="h-64 md:h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <TrendingUp className="h-16 w-16 text-white" />
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center space-x-2 mb-4">
                <Badge className={`${getCategoryColor(featuredArticle.category)} text-white`}>
                  {featuredArticle.category}
                </Badge>
                <span className="text-yellow-400 text-sm font-semibold">FEATURED</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{featuredArticle.title}</h2>
              <p className="text-gray-300 mb-6">{featuredArticle.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {featuredArticle.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(featuredArticle.date)}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {featuredArticle.views}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {featuredArticle.comments}
                  </div>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Read Full Article
              </Button>
            </div>
          </div>
        </Card>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`${getCategoryColor(article.category)} text-white text-xs`}>
                    {article.category}
                  </Badge>
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(article.date)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {article.views}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {article.comments}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 px-8 py-3">
            Load More Articles
          </Button>
        </div>

        {/* Archive and Social */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-xl text-white">Article Archive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <a href="#" className="block text-blue-400 hover:text-blue-300 text-sm">
                  December 2024 (8 articles)
                </a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 text-sm">
                  November 2024 (12 articles)
                </a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 text-sm">
                  October 2024 (15 articles)
                </a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 text-sm">
                  September 2024 (10 articles)
                </a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 text-sm">
                  View All Archives →
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-xl text-white">Follow Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">
                Stay connected with BlackCnote on social media for real-time updates and insights.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-blue-800 hover:bg-blue-900 text-white">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </Button>
                <Button className="bg-purple-700 hover:bg-purple-800 text-white">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017 0z"/>
                  </svg>
                  Pinterest
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}