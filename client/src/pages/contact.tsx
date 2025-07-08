import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Address",
      details: ["support@blackcnote.com", "info@blackcnote.com"],
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Call us during business hours"
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Financial District", "New York, NY 10004"],
      description: "Visit our headquarters"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      description: "Support available during these hours"
    }
  ];

  const departments = [
    {
      name: "General Support",
      email: "support@blackcnote.com",
      description: "For general inquiries and account assistance"
    },
    {
      name: "Investment Consultation",
      email: "invest@blackcnote.com", 
      description: "For investment advice and plan consultation"
    },
    {
      name: "Technical Support",
      email: "tech@blackcnote.com",
      description: "For platform and technical issues"
    },
    {
      name: "Partnership Inquiries",
      email: "partners@blackcnote.com",
      description: "For business partnerships and affiliations"
    }
  ];

  const faqItems = [
    {
      question: "How do I create an account?",
      answer: "Click on 'Get Started' and follow the simple registration process. You'll need to provide basic information and verify your email address."
    },
    {
      question: "What are the minimum investment amounts?",
      answer: "Our Starter Plan begins at just $100, making it accessible for new investors. Higher tier plans have different minimum requirements."
    },
    {
      question: "How long does it take to process withdrawals?",
      answer: "Withdrawal requests are typically processed within 24-48 hours during business days, depending on your payment method."
    },
    {
      question: "Is my investment secure?",
      answer: "Yes, we use bank-grade security measures including SSL encryption, multi-factor authentication, and segregated client funds."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">

      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contact <span className="text-blue-400">BlackCnote</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about our investment platform? Our expert team is here to help you 
            make informed decisions about your financial future.
          </p>
        </div>

        {/* Contact Form and Info */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-blue-400" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="What is this regarding?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-blue-400 mb-1">{detail}</p>
                        ))}
                        <p className="text-gray-300 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Department Contact Information */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Department Contacts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{dept.name}</h3>
                  <p className="text-blue-400 text-sm mb-3">{dept.email}</p>
                  <p className="text-gray-300 text-xs">{dept.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{item.question}</h3>
                  <p className="text-gray-300">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map and Additional Info */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Visit Our Office</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <p>Interactive Map Coming Soon</p>
                  <p className="text-sm">123 Financial District, New York, NY 10004</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Support Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                    → Investment Guide
                  </a>
                  <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                    → Account Setup Tutorial
                  </a>
                  <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                    → Security Best Practices
                  </a>
                  <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                    → Withdrawal Instructions
                  </a>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">Emergency Contact</h4>
                <p className="text-gray-300">
                  For urgent account security issues, call our 24/7 emergency line:
                </p>
                <p className="text-blue-400 font-semibold">+1 (555) 911-HELP</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Still Have Questions?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our investment experts are available to provide personalized consultation 
            and help you choose the best investment strategy for your goals.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}