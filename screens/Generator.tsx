import React, { useState } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import { Button } from '../components/Button';
import { ScreenName, GenMode } from '../types';
import { Loader2, Crop, RefreshCcw, ImagePlus } from 'lucide-react';

interface GenerateProps {
  navigate: (s: ScreenName) => void;
  mode: GenMode;
  images: { 1: string | null; 2: string | null };
  onSlotClick: (slot: 1 | 2) => void;
}

export const GenerateScreen: React.FC<GenerateProps> = ({ navigate, mode, images, onSlotClick }) => {
  const [prompt, setPrompt] = useState('');

  const renderSlot = (slotNumber: 1 | 2) => {
    const imgUrl = images[slotNumber];
    
    return (
      <div 
        onClick={() => onSlotClick(slotNumber)}
        className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 group ${
           mode === 'SINGLE' ? 'w-full h-80 sm:h-96' : 'w-full flex-1 min-h-[200px]'
        } ${!imgUrl ? 'bg-zinc-900 border-2 border-dashed border-zinc-800 hover:border-zinc-700' : 'border border-white/10'}`}
      >
        {imgUrl ? (
          <>
             <img src={imgUrl} className="w-full h-full object-cover" alt={`slot-${slotNumber}`} />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
             
             {/* Overlay Actions */}
             <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                 className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-yellow-400 hover:text-black transition-colors"
                 onClick={(e) => { e.stopPropagation(); /* crop logic */ }}
               >
                  <Crop size={18} />
               </button>
               <button 
                 className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-yellow-400 hover:text-black transition-colors"
                 onClick={(e) => { e.stopPropagation(); onSlotClick(slotNumber); }}
               >
                  <RefreshCcw size={18} />
               </button>
             </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 gap-3 group-hover:text-zinc-400">
             <div className="p-4 bg-zinc-800 rounded-full group-hover:scale-110 transition-transform">
                <ImagePlus size={32} strokeWidth={1.5} />
             </div>
             <span className="font-medium">
               {slotNumber === 1 ? "Upload First Photo" : "Upload Second Photo"}
             </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <ScreenContainer onBack={() => navigate(ScreenName.HOME)} className="pt-20 px-6 flex flex-col">
      
      {/* Header */}
      <div className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none">
         <h2 className="text-lg font-bold text-white">Generate</h2>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pb-4">
        {renderSlot(1)}
        {mode === 'DUAL' && renderSlot(2)}
      </div>

      {/* Input Area */}
      <div className="mt-4 mb-8">
          <div className="flex justify-between items-end mb-2 px-1">
             <label className="text-sm font-bold text-white">Describe your idea</label>
             <span className="text-xs text-zinc-500">Optional</span>
          </div>
          <textarea 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-sm text-white resize-none focus:outline-none focus:border-zinc-700 placeholder-zinc-600 transition-all"
            rows={3}
            placeholder={mode === 'DUAL' ? "Darkest mood, old tree on bg, shape, winter season" : "Type your instructions..."}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
      </div>

      <div className="mb-10">
        <Button onClick={() => navigate(ScreenName.LOADING)} variant="magic">
          Generate
        </Button>
      </div>
    </ScreenContainer>
  );
};

// ---------------- Loading Screen ----------------
export const LoadingScreen: React.FC<{ navigate: (s: ScreenName) => void }> = ({ navigate }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 30);

    const timeout = setTimeout(() => {
      navigate(ScreenName.RESULT);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    }
  }, [navigate]);

  return (
    <ScreenContainer hideStatusBar className="items-center justify-center bg-black relative">
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
       <div className="w-64 h-64 bg-yellow-400/10 rounded-full blur-[100px] absolute animate-pulse"></div>

       <div className="relative z-10 flex flex-col items-center">
         <div className="relative mb-8">
           <Loader2 className="w-16 h-16 text-yellow-400 animate-spin" />
           <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">{progress}%</div>
         </div>
         
         <h2 className="text-2xl font-bold mb-2">Pixel glow up in progress...</h2>
         <p className="text-zinc-500 animate-pulse">Consulting the AI spirits</p>
       </div>
    </ScreenContainer>
  );
};