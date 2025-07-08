import React from 'react';
import { Link } from 'wouter';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Investment Plans', href: '/investments' },
    { name: 'Profit Calculator', href: '/calculator' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'News & Updates', href: '/news' },
  ];

  const services = [
    'High-Yield Investment Programs',
    'Crowdfunding Opportunities',
    'Financial Education',
    'Community Investment',
    'Wealth Building Strategies',
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'info@blackcnote.com' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: 'Atlanta, GA, USA' },
  ];

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding and Mission */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">BC</span>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
                  BlackCnote
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Empowering Black communities through strategic investments and wealth circulation. 
              Building generational wealth by 2040.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-amber-400 hover:to-orange-600 rounded-lg flex items-center justify-center transition-all duration-200 group"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h6>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h6 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h6>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-slate-400 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Info
            </h6>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <li key={index} className="flex items-center space-x-3 text-slate-400 text-sm">
                    <IconComponent className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{contact.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-400 text-sm">
            &copy; {currentYear} BlackCnote. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="text-slate-400 hover:text-white transition-colors duration-200">
              Risk Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}