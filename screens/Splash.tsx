import React, { useEffect } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';

interface SplashProps {
  onFinish: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <ScreenContainer hideStatusBar className="justify-center items-center">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-8 bg-yellow-400/20 blur-3xl rounded-full animate-pulse"></div>
        <h1 className="text-5xl font-black tracking-tighter italic relative z-10">
          SUPA<span className="text-yellow-400">CAM</span>
        </h1>
      </div>
    </ScreenContainer>
  );
};