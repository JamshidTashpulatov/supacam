import React, { useState } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import { Button } from '../components/Button';
import { ScreenName } from '../types';
import { Share2, Download, RefreshCw, ArrowLeft } from 'lucide-react';

export const ResultScreen: React.FC<{ navigate: (s: ScreenName) => void }> = ({ navigate }) => {
  const [showShare, setShowShare] = useState(false);

  // Mock Generated Image
  const resultImg = "https://picsum.photos/id/453/600/800";

  const handleShare = () => setShowShare(true);

  return (
    <ScreenContainer hideStatusBar className="bg-zinc-950">
       <div className="absolute top-12 left-4 z-50">
         <button onClick={() => navigate(ScreenName.HOME)} className="bg-black/50 p-2 rounded-full text-white backdrop-blur-md"><ArrowLeft/></button>
       </div>

       <div className="flex-1 flex flex-col items-center justify-center p-8 pt-20 relative z-10">
          <div className="bg-white p-4 pb-12 shadow-2xl rotate-1 transition-transform hover:rotate-0 duration-500 max-w-xs w-full">
             <div className="bg-zinc-100 aspect-[4/5] w-full overflow-hidden mb-4">
                <img src={resultImg} className="w-full h-full object-cover" alt="result"/>
             </div>
             <div className="font-handwriting text-black text-center font-bold text-xl opacity-80 transform -rotate-1">
               #SUPACAM
             </div>
          </div>

          <div className="mt-8 text-center">
             <h3 className="text-xl font-bold mb-1">This pic is pure fire. 🔥</h3>
             <p className="text-zinc-400 text-sm">Share it before it breaks the internet.</p>
          </div>
       </div>

       <div className="p-6 pb-10 bg-zinc-900 rounded-t-[40px]">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button onClick={() => navigate(ScreenName.GENERATE)} variant="secondary" className="gap-2">
               <RefreshCw size={18} /> Regenerate
            </Button>
            <Button onClick={() => {}} variant="secondary" className="gap-2">
               <Download size={18} /> Save
            </Button>
          </div>
          <Button onClick={handleShare}>Share to Feed</Button>
       </div>

       {/* Share Sheet Mock */}
       {showShare && (
         <div className="absolute inset-0 z-[100] flex items-end justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowShare(false)}></div>
            <div className="bg-zinc-800 w-full rounded-t-3xl p-6 relative z-10 animate-slide-up">
               <h3 className="text-white font-bold mb-6">Share via</h3>
               <div className="flex gap-6 overflow-x-auto pb-4">
                  {['Instagram', 'TikTok', 'Snapchat', 'Message'].map(app => (
                    <div key={app} className="flex flex-col items-center gap-2 min-w-[70px]">
                       <div className="w-14 h-14 rounded-xl bg-zinc-700 flex items-center justify-center">
                          <Share2 size={24}/>
                       </div>
                       <span className="text-xs text-zinc-400">{app}</span>
                    </div>
                  ))}
               </div>
               <button onClick={() => setShowShare(false)} className="w-full bg-zinc-900 py-4 rounded-xl font-bold mt-2">Cancel</button>
            </div>
         </div>
       )}
    </ScreenContainer>
  );
};