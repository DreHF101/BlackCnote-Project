import { Search, HelpCircle, Book, MessageSquare, Shield, DollarSign, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: DollarSign,
      title: "Getting Started",
      description: "Learn the basics of investing with BlackCnote",
      articles: 12,
      color: "text-green-400"
    },
    {
      icon: Shield,
      title: "Account Security",
      description: "Keep your account safe and secure",
      articles: 8,
      color: "text-blue-400"
    },
    {
      icon: Users,
      title: "Investment Plans",
      description: "Understanding our investment options",
      articles: 15,
      color: "text-purple-400"
    },
    {
      icon: Zap,
      title: "Withdrawals & Deposits",
      description: "Managing your funds and transactions",
      articles: 10,
      color: "text-yellow-400"
    }
  ];

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account on BlackCnote?",
          answer: "Creating an account is simple. Click 'Get Started' on our homepage, fill in your personal information, verify your email address, and complete the KYC process. You'll be ready to invest within 24 hours."
        },
        {
          question: "What is the minimum investment amount?",
          answer: "Our Starter Plan has a minimum investment of $100, making it accessible for beginners. Higher-tier plans have different minimums: Professional ($1,000), Premium ($5,000), and VIP ($25,000)."
        },
        {
          question: "How long do investment terms last?",
          answer: "Investment terms vary by plan: Starter (30-90 days), Professional (90-180 days), Premium (180-365 days), and VIP (365+ days). Longer terms typically offer better returns."
        }
      ]
    },
    {
      category: "Account Security",
      questions: [
        {
          question: "How is my money protected?",
          answer: "We use bank-grade security including SSL encryption, two-factor authentication, cold storage for funds, and regular security audits. Your investments are also insured up to $250,000."
        },
        {
          question: "What should I do if I suspect unauthorized access?",
          answer: "Immediately change your password, enable 2FA if not already active, contact our support team, and review your account activity. We monitor all accounts 24/7 for suspicious activity."
        },
        {
          question: "How do I enable two-factor authentication?",
          answer: "Go to Account Settings > Security > Two-Factor Authentication. Download an authenticator app, scan the QR code, and enter the verification code. This adds an extra layer of security to your account."
        }
      ]
    },
    {
      category: "Investment Plans",
      questions: [
        {
          question: "What's the difference between investment plans?",
          answer: "Plans differ in minimum investment, APY rates, terms, and features. Starter (12-15% APY), Professional (15-18% APY), Premium (18-22% APY), and VIP (22-25% APY) with additional perks like priority support."
        },
        {
          question: "Can I change my investment plan?",
          answer: "You can upgrade your plan at any time, but downgrades are only possible at the end of your current investment term. Contact support to discuss your options."
        },
        {
          question: "How are returns calculated and paid?",
          answer: "Returns are calculated daily based on your APY rate and paid according to your plan's schedule (daily, weekly, or monthly). You can reinvest returns or withdraw them to your wallet."
        }
      ]
    },
    {
      category: "Withdrawals & Deposits",
      questions: [
        {
          question: "How long do withdrawals take to process?",
          answer: "Withdrawals are processed within 24-48 hours during business days. Cryptocurrency withdrawals are typically faster (2-6 hours), while bank transfers may take 3-5 business days."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept bank transfers, credit/debit cards, PayPal, and major cryptocurrencies (Bitcoin, Ethereum, USDT, USDC). Minimum deposit varies by payment method."
        },
        {
          question: "Are there any withdrawal fees?",
          answer: "We charge a small processing fee: 2% for crypto withdrawals, 3% for PayPal, and $15 for bank transfers. VIP members enjoy reduced fees or no fees for certain methods."
        }
      ]
    }
  ];

  const popularArticles = [
    {
      title: "Complete Guide to Getting Started",
      description: "Everything you need to know about investing with BlackCnote",
      readTime: "5 min read",
      category: "Getting Started"
    },
    {
      title: "Understanding Investment Returns",
      description: "How we calculate and distribute your investment profits",
      readTime: "3 min read",
      category: "Investment Plans"
    },
    {
      title: "Security Best Practices",
      description: "Keep your account secure with these essential tips",
      readTime: "4 min read",
      category: "Account Security"
    },
    {
      title: "Withdrawal Process Explained",
      description: "Step-by-step guide to withdrawing your funds",
      readTime: "3 min read",
      category: "Withdrawals & Deposits"
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">

      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How can we <span className="text-blue-400">help you?</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Find answers to your questions about investing, account management, 
            and platform features in our comprehensive help center.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 pl-12 py-4 text-lg"
              placeholder="Search for help articles, FAQs, or guides..."
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Icon className={`h-12 w-12 ${category.color} mx-auto mb-4`} />
                    <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{category.description}</p>
                    <p className="text-blue-400 text-xs">{category.articles} articles</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Popular Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-400">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{article.title}</h3>
                  <p className="text-gray-300 text-sm">{article.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto">
            {(searchQuery ? filteredFAQ : faqData).map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">{category.category}</h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`${categoryIndex}-${index}`}
                      className="bg-white/10 backdrop-blur-md border-white/20 rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-white hover:text-blue-400 text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center justify-center">
                <MessageSquare className="h-6 w-6 mr-2 text-blue-400" />
                Still Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                Can't find what you're looking for? Our support team is available 24/7 
                to assist you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat Support
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Submit a Ticket
                </Button>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-gray-400">
                  Support Hours: 24/7 • Average Response Time: Under 30 minutes
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}