import Header from "@/components/layout/header";
import { Shield, Users, TrendingUp, Award, Target, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const stats = [
    { label: "Years of Experience", value: "8+", icon: Award },
    { label: "Active Investors", value: "15,000+", icon: Users },
    { label: "Total Invested", value: "$50M+", icon: TrendingUp },
    { label: "Countries Served", value: "45+", icon: Globe },
  ];

  const team = [
    {
      name: "Marcus Johnson",
      role: "Chief Executive Officer",
      experience: "15+ years in investment management",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      experience: "12+ years in fintech development",
      image: "/api/placeholder/150/150"
    },
    {
      name: "David Rodriguez",
      role: "Chief Financial Officer",
      experience: "18+ years in financial services",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Emily Thompson",
      role: "Head of Operations",
      experience: "10+ years in operations management",
      image: "/api/placeholder/150/150"
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize the security of your investments with bank-grade encryption and multi-layer protection systems."
    },
    {
      icon: Target,
      title: "Proven Results",
      description: "Our track record speaks for itself with consistent returns and transparent performance reporting."
    },
    {
      icon: Users,
      title: "Client Focus",
      description: "Every decision we make is centered around maximizing value and returns for our investors."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We leverage cutting-edge technology and market insights to stay ahead of investment trends."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-blue-400">BlackCnote</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Since 2016, BlackCnote has been at the forefront of digital investment solutions, 
            providing innovative opportunities for investors worldwide to grow their wealth through 
            carefully managed investment programs.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              To democratize access to high-yield investment opportunities while maintaining 
              the highest standards of security, transparency, and customer service. We believe 
              that everyone deserves the opportunity to build wealth through smart investments.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our platform combines traditional investment principles with cutting-edge 
              technology to deliver consistent returns for our global community of investors.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              To become the world's most trusted and innovative investment platform, 
              setting new standards for transparency, security, and investor returns 
              in the digital investment space.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We envision a future where sophisticated investment strategies are accessible 
              to everyone, regardless of their background or initial capital.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <Icon className="h-10 w-10 text-blue-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-300 text-xs">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company History */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2016</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Company Founded</h3>
                  <p className="text-gray-300">BlackCnote was established with a vision to provide innovative investment solutions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2018</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Platform Launch</h3>
                  <p className="text-gray-300">Launched our digital investment platform, serving our first 1,000 investors.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2021</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Global Expansion</h3>
                  <p className="text-gray-300">Expanded operations to serve investors across 45+ countries worldwide.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2024</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Innovation Milestone</h3>
                  <p className="text-gray-300">Reached $50M+ in total investments and 15,000+ active investors milestone.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Investment Journey?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust BlackCnote with their financial future. 
            Start building wealth today with our proven investment strategies.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-lg font-semibold transition-colors">
              View Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}