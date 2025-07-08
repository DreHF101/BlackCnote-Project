import React from 'react';
import { Button } from './button';
import { HelpCircle, Play } from 'lucide-react';

interface OnboardingTriggerProps {
  onStartTutorial: () => void;
  variant?: 'button' | 'fab' | 'menu-item';
}

export function OnboardingTrigger({ onStartTutorial, variant = 'button' }: OnboardingTriggerProps) {
  if (variant === 'fab') {
    return (
      <Button
        onClick={onStartTutorial}
        size="lg"
        className="fixed bottom-6 right-6 z-40 rounded-full w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-xl hover:shadow-2xl transition-all duration-200"
        aria-label="Start tutorial"
      >
        <HelpCircle className="w-6 h-6 text-white" />
      </Button>
    );
  }

  if (variant === 'menu-item') {
    return (
      <Button
        onClick={onStartTutorial}
        variant="ghost"
        className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
      >
        <Play className="w-4 h-4 mr-2" />
        Take Tutorial
      </Button>
    );
  }

  return (
    <Button
      onClick={onStartTutorial}
      variant="outline"
      className="border-amber-500 text-amber-400 hover:bg-amber-500/10"
    >
      <Play className="w-4 h-4 mr-2" />
      Start Tutorial
    </Button>
  );
}