import React, { useState, useEffect } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import { Button } from '../components/Button';
import { ChevronRight, Zap, Layers, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onFinish: () => void;
}

const STEPS = [
  {
    id: 1,
    icon: Zap,
    tag: "INSTANT MAGIC",
    title: "ZERO\nEFFORT.\nALL FLEX.",
    subtitle: "Stop posting boring photos. Let AI turn your raw shots into viral masterpieces in seconds.",
    img: "https://picsum.photos/id/338/800/1200", // Dark/Moody vibe
    highlight: "EFFORT."
  },
  {
    id: 2,
    icon: Layers,
    tag: "TREND SETTER",
    title: "BREAK THE\nINTERNET",
    subtitle: "From Cyberpunk to 90s Retro. If it's trending, you get it first. Stay ahead of the feed.",
    img: "https://picsum.photos/id/177/800/1200",
    highlight: "INTERNET"
  },
  {
    id: 3,
    icon: Sparkles,
    tag: "LIMITLESS YOU",
    title: "YOUR VIBE\nAMPLIFIED",
    subtitle: "Remix your reality. It's not just a filter, it's a complete visual overhaul tailored to you.",
    img: "https://picsum.photos/id/64/800/1200", // Portrait
    highlight: "AMPLIFIED"
  }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (step < STEPS.length - 1) {
      setTimeout(() => {
        setStep(s => s + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      onFinish();
    }
  };

  const handleSkip = () => {
    onFinish();
  };

  const current = STEPS[step];
  const Icon = current.icon;

  // Preload images
  useEffect(() => {
    STEPS.forEach(s => {
      const img = new Image();
      img.src = s.img;
    });
  }, []);

  return (
    <ScreenContainer hideStatusBar className="bg-black">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
         {STEPS.map((s, i) => (
           <div 
             key={s.id}
             className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${i === step ? 'opacity-100' : 'opacity-0'}`}
           >
             <img 
               src={s.img} 
               alt="bg" 
               className="w-full h-full object-cover transform scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/90"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
           </div>
         ))}
      </div>

      {/* Header Actions */}
      <div className="absolute top-4 left-0 right-0 z-50 px-6 pt-10 flex justify-between items-center">
        {/* Story-like Progress Bars */}
        <div className="flex-1 flex gap-2 mr-6">
          {STEPS.map((_, i) => (
            <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-yellow-400 transition-all duration-500 ease-out ${
                  i <= step ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Skip Button */}
        <button 
          onClick={handleSkip}
          className="text-xs font-bold text-white/70 hover:text-white uppercase tracking-wider py-2 px-1"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-12 px-6">
        
        {/* Tag */}
        <div className={`flex items-center gap-2 text-yellow-400 mb-4 transition-all duration-500 transform ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="p-1.5 bg-yellow-400/20 rounded-lg backdrop-blur-md border border-yellow-400/20">
             <Icon size={16} strokeWidth={3} />
          </div>
          <span className="font-bold text-xs tracking-[0.2em] uppercase">{current.tag}</span>
        </div>

        {/* Title */}
        <h1 className={`text-5xl font-black italic tracking-tighter leading-[0.9] mb-4 text-white transition-all duration-500 delay-75 transform ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
          {current.title.split('\n').map((line, i) => (
            <span key={i} className="block">
              {line.includes(current.highlight) ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                  {line}
                </span>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className={`text-zinc-300 text-lg font-medium leading-snug mb-10 max-w-[90%] transition-all duration-500 delay-100 transform ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
          {current.subtitle}
        </p>

        {/* Button */}
        <div className={`transition-all duration-500 delay-150 transform ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <Button onClick={handleNext} className="group relative overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              {step === STEPS.length - 1 ? "Get Started" : "Continue"} 
              <ChevronRight size={20} className="transition-transform group-active:translate-x-1" />
            </span>
            {/* Button Glow Animation */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 transform skew-x-12"></div>
          </Button>
        </div>

      </div>
    </ScreenContainer>
  );
};