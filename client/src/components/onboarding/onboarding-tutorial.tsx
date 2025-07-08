import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, CheckCircle, Target, Calculator, BarChart3, Users, Wallet, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Link } from 'wouter';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
  targetElement?: string;
  action?: {
    label: string;
    href: string;
  };
}

interface OnboardingTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  userType?: 'new' | 'returning';
}

export function OnboardingTutorial({ isOpen, onClose, onComplete, userType = 'new' }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to BlackCnote',
      description: 'Your journey to financial empowerment begins here',
      icon: Target,
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">BC</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Welcome to BlackCnote</h3>
          <p className="text-slate-300 leading-relaxed">
            BlackCnote is a revolutionary investment platform designed to empower Black communities 
            through strategic investments and wealth circulation. Let's take a quick tour to get you started.
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 mt-6">
            <h4 className="text-amber-400 font-semibold mb-2">Our Mission</h4>
            <p className="text-sm text-slate-300">
              Building generational wealth by 2040 through community-focused investment opportunities 
              and financial education.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'investment-plans',
      title: 'Explore Investment Plans',
      description: 'Choose from our carefully curated investment opportunities',
      icon: Wallet,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Investment Plans</h3>
          <div className="grid gap-3">
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-green-400">Starter Plan</h4>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400">12.5% APY</Badge>
              </div>
              <p className="text-sm text-slate-300">Perfect for beginners - $100 minimum</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-blue-400">Growth Plan</h4>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">15.8% APY</Badge>
              </div>
              <p className="text-sm text-slate-300">Balanced growth - $1,000 minimum</p>
            </div>
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-amber-400">Premium Plan</h4>
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-400">22.3% APY</Badge>
              </div>
              <p className="text-sm text-slate-300">Maximum returns - $10,000 minimum</p>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            All plans are backed by our diversified investment strategies and risk management protocols.
          </p>
        </div>
      ),
      action: {
        label: 'View All Plans',
        href: '/investments',
      },
    },
    {
      id: 'calculator',
      title: 'Investment Calculator',
      description: 'Calculate your potential returns with our advanced calculator',
      icon: Calculator,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Profit Calculator</h3>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-slate-400">Investment Amount</label>
                <div className="text-lg font-semibold text-white">$5,000</div>
              </div>
              <div>
                <label className="text-sm text-slate-400">Duration</label>
                <div className="text-lg font-semibold text-white">90 days</div>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Projected Profit:</span>
                <span className="text-xl font-bold text-green-400">$790</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-slate-300">Total Return:</span>
                <span className="text-lg font-semibold text-white">$5,790</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Use our calculator to estimate potential returns based on different investment amounts and durations.
          </p>
        </div>
      ),
      action: {
        label: 'Try Calculator',
        href: '/calculator',
      },
    },
    {
      id: 'dashboard',
      title: 'Your Dashboard',
      description: 'Monitor your investments and track your portfolio performance',
      icon: BarChart3,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Dashboard Overview</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-400">$12,450</div>
              <div className="text-sm text-slate-300">Total Invested</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-400">$2,180</div>
              <div className="text-sm text-slate-300">Total Profit</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-amber-400">5</div>
              <div className="text-sm text-slate-300">Active Plans</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-400">17.5%</div>
              <div className="text-sm text-slate-300">Avg. ROI</div>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Your dashboard provides real-time insights into your investment performance and portfolio analytics.
          </p>
        </div>
      ),
      action: {
        label: 'Go to Dashboard',
        href: '/dashboard',
      },
    },
    {
      id: 'referrals',
      title: 'Referral Program',
      description: 'Earn extra income by inviting friends to join BlackCnote',
      icon: Users,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Referral Program</h3>
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-amber-400">Multi-Level Commissions</h4>
              <Badge className="bg-amber-500 text-black">Up to 10%</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Level 1 (Direct):</span>
                <span className="text-white font-semibold">5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Level 2:</span>
                <span className="text-white font-semibold">3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Level 3:</span>
                <span className="text-white font-semibold">2%</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Your Referral Link</h4>
            <div className="bg-slate-900 rounded p-2 font-mono text-sm text-slate-300 break-all">
              https://blackcnote.com/ref/ABC123
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Share your referral link and earn commissions from your network's investments.
          </p>
        </div>
      ),
      action: {
        label: 'View Referrals',
        href: '/referrals',
      },
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      description: 'Start your investment journey today',
      icon: CheckCircle,
      content: (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">Congratulations!</h3>
          <p className="text-slate-300 leading-relaxed">
            You've completed the BlackCnote onboarding tutorial. You're now ready to start 
            building wealth through our investment platform.
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 mt-6">
            <h4 className="text-amber-400 font-semibold mb-3">Quick Start Checklist:</h4>
            <div className="space-y-2 text-sm text-left">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-slate-300">Account created and verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-slate-500 rounded"></div>
                <span className="text-slate-300">Choose your first investment plan</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-slate-500 rounded"></div>
                <span className="text-slate-300">Make your first investment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-slate-500 rounded"></div>
                <span className="text-slate-300">Share your referral link</span>
              </div>
            </div>
          </div>
        </div>
      ),
      action: {
        label: 'Start Investing',
        href: '/investments',
      },
    },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, steps[currentStep].id]));
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setCompletedSteps(prev => new Set([...prev, steps[currentStep].id]));
    onComplete();
    onClose();
  };

  const handleSkip = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-900 border-slate-700 shadow-2xl">
        <CardHeader className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">{currentStepData.title}</CardTitle>
                <CardDescription className="text-slate-400">
                  {currentStepData.description}
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-slate-400">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="min-h-[300px]">
            {currentStepData.content}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="text-slate-400 border-slate-600 hover:bg-slate-800"
              >
                Skip Tutorial
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="border-slate-600 hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              )}

              {currentStepData.action && (
                <Link href={currentStepData.action.href}>
                  <Button
                    variant="outline"
                    className="border-amber-500 text-amber-400 hover:bg-amber-500/10"
                    onClick={() => setCompletedSteps(prev => new Set([...prev, currentStepData.id]))}
                  >
                    {currentStepData.action.label}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              )}

              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Complete
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}