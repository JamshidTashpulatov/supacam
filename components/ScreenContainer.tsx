import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ScreenContainerProps {
  children: React.ReactNode;
  onBack?: () => void;
  hideStatusBar?: boolean;
  className?: string;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ 
  children, 
  onBack, 
  hideStatusBar = false,
  className = '' 
}) => {
  return (
    <div className={`flex flex-col h-full w-full relative bg-black text-white overflow-hidden ${className}`}>
      
      {/* Back Button Header */}
      {onBack && (
        <div className="absolute top-6 left-4 z-40">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
      )}

      {children}
    </div>
  );
};