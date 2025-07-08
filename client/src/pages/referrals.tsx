import { Users, Share2, Gift, DollarSign, TrendingUp, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function Referrals() {
  const [copied, setCopied] = useState(false);
  const referralCode = "BCN-2024-JOHN123";
  const referralLink = `https://blackcnote.com/register?ref=${referralCode}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referralStats = {
    totalReferred: 42,
    activeReferrals: 38,
    totalEarned: 2847.50,
    thisMonth: 485.20,
    pendingCommission: 125.30
  };

  const commissionTiers = [
    {
      level: "Level 1 (Direct)",
      percentage: "10%",
      description: "Earn 10% commission on direct referrals' first investments",
      color: "text-green-400"
    },
    {
      level: "Level 2 (Sub-referrals)",
      percentage: "5%",
      description: "Earn 5% commission on your referrals' referrals",
      color: "text-blue-400"
    },
    {
      level: "Level 3 (Sub-sub-referrals)",
      percentage: "2%",
      description: "Earn 2% commission on third-level referrals",
      color: "text-purple-400"
    },
    {
      level: "VIP Bonus",
      percentage: "15%",
      description: "VIP members earn 15% on direct referrals (upgrade required)",
      color: "text-yellow-400"
    }
  ];

  const recentReferrals = [
    {
      name: "Sarah M.",
      date: "2024-01-15",
      status: "Active",
      investment: 1500,
      commission: 150,
      level: 1
    },
    {
      name: "Mike T.",
      date: "2024-01-12",
      status: "Active",
      investment: 2500,
      commission: 250,
      level: 1
    },
    {
      name: "Lisa K.",
      date: "2024-01-10",
      status: "Pending",
      investment: 500,
      commission: 50,
      level: 2
    },
    {
      name: "David R.",
      date: "2024-01-08",
      status: "Active",
      investment: 3000,
      commission: 300,
      level: 1
    }
  ];

  const marketingMaterials = [
    {
      type: "Social Media Banner",
      format: "JPG (1200x630)",
      description: "Perfect for Facebook, Twitter, LinkedIn posts"
    },
    {
      type: "Email Template",
      format: "HTML",
      description: "Professional email template for personal contacts"
    },
    {
      type: "Instagram Story",
      format: "JPG (1080x1920)",
      description: "Eye-catching story template with your referral code"
    },
    {
      type: "Video Explainer",
      format: "MP4",
      description: "30-second video explaining BlackCnote benefits"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">

      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Referral <span className="text-blue-400">Program</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Earn passive income by sharing BlackCnote with friends and family. 
            Get paid for every successful referral with our multi-level commission system.
          </p>
        </div>

        {/* Referral Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">{referralStats.totalReferred}</div>
              <div className="text-sm text-gray-300">Total Referred</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">{referralStats.activeReferrals}</div>
              <div className="text-sm text-gray-300">Active Referrals</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">${referralStats.totalEarned}</div>
              <div className="text-sm text-gray-300">Total Earned</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <Gift className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">${referralStats.thisMonth}</div>
              <div className="text-sm text-gray-300">This Month</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <Share2 className="h-8 w-8 text-orange-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">${referralStats.pendingCommission}</div>
              <div className="text-sm text-gray-300">Pending</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Referral Tools */}
          <div className="space-y-8">
            {/* Your Referral Code */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Share2 className="h-6 w-6 mr-2 text-blue-400" />
                  Your Referral Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Referral Code
                  </label>
                  <div className="flex">
                    <Input
                      value={referralCode}
                      readOnly
                      className="bg-white/10 border-white/20 text-white rounded-r-none"
                    />
                    <Button 
                      onClick={() => copyToClipboard(referralCode)}
                      className="bg-blue-600 hover:bg-blue-700 rounded-l-none"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Referral Link
                  </label>
                  <div className="flex">
                    <Input
                      value={referralLink}
                      readOnly
                      className="bg-white/10 border-white/20 text-white rounded-r-none text-sm"
                    />
                    <Button 
                      onClick={() => copyToClipboard(referralLink)}
                      className="bg-blue-600 hover:bg-blue-700 rounded-l-none"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087"/>
                    </svg>
                    WhatsApp
                  </Button>
                  <Button className="flex-1 bg-blue-800 hover:bg-blue-900">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Marketing Materials */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Marketing Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {marketingMaterials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">{material.type}</h4>
                        <p className="text-gray-400 text-sm">{material.description}</p>
                        <p className="text-blue-400 text-xs">{material.format}</p>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Commission Structure & Recent Activity */}
          <div className="space-y-8">
            {/* Commission Structure */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-green-400" />
                  Commission Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commissionTiers.map((tier, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{tier.level}</h4>
                        <span className={`text-xl font-bold ${tier.color}`}>{tier.percentage}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{tier.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                  <h4 className="text-blue-400 font-semibold mb-2">Bonus Opportunities</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Monthly bonus: Extra 2% for 10+ active referrals</li>
                    <li>• Quarterly bonus: $500 for top performer</li>
                    <li>• Annual bonus: Luxury trip for 100+ referrals</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Recent Referrals */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Recent Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReferrals.map((referral, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-white font-medium">{referral.name}</h4>
                          <Badge 
                            variant={referral.status === 'Active' ? 'default' : 'secondary'}
                            className={referral.status === 'Active' ? 'bg-green-600' : 'bg-yellow-600'}
                          >
                            {referral.status}
                          </Badge>
                          <span className="text-xs text-gray-400">L{referral.level}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{referral.date}</p>
                        <p className="text-blue-400 text-sm">Investment: ${referral.investment}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-semibold">${referral.commission}</div>
                        <div className="text-gray-400 text-xs">Commission</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-transparent border border-white/20 text-white hover:bg-white/10">
                  View All Referrals
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Share Your Link</h3>
                <p className="text-gray-300">
                  Share your unique referral link with friends, family, or on social media. 
                  Use our marketing materials to make it easy.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">They Sign Up</h3>
                <p className="text-gray-300">
                  When someone registers using your link and makes their first investment, 
                  they become your active referral.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Earn Commissions</h3>
                <p className="text-gray-300">
                  Receive instant commissions on their investments. Earnings are paid 
                  weekly and can be withdrawn or reinvested.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Start Earning Today</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful affiliates earning passive income with BlackCnote. 
            The more you share, the more you earn!
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            Get Started with Referrals
          </Button>
        </div>
      </div>
    </div>
  );
}