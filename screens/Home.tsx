import React, { useState } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import { TabBar } from '../components/TabBar';
import { TRENDS } from '../constants';
import { ScreenName, GenMode } from '../types';
import { Crown, Sparkles, Zap, Flame, Layers, Image as ImageIcon, X } from 'lucide-react';

interface HomeProps {
  navigate: (screen: ScreenName) => void;
  onStartGeneration: (mode: GenMode) => void;
}

// Local Action Sheet Component for Home
const SelectionSheet: React.FC<{ isOpen: boolean; onClose: () => void; onSelect: (m: GenMode) => void }> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;
  
  return (
    <div className="absolute inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-zinc-900 w-full rounded-t-[30px] p-6 pb-10 relative z-10 animate-slide-up border-t border-zinc-800">
        <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-6 opacity-50"></div>
        
        <div className="flex justify-between items-center mb-2">
           <h3 className="text-xl font-bold text-white">Choose your Canvas</h3>
           <button onClick={onClose} className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white">
             <X size={20} />
           </button>
        </div>
        <p className="text-zinc-400 text-sm mb-6">How do you want to create today?</p>

        <div className="space-y-4">
           {/* Option 1: Single */}
           <button 
             onClick={() => onSelect('SINGLE')}
             className="w-full bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl flex items-center gap-4 transition-all active:scale-98 group border border-zinc-700 hover:border-yellow-400/50"
           >
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
                 <ImageIcon size={24} className="text-white group-hover:text-black" />
              </div>
              <div className="text-left">
                 <h4 className="font-bold text-white text-lg">Solo Masterpiece</h4>
                 <p className="text-xs text-zinc-400">Enhance a single photo with AI magic.</p>
              </div>
           </button>

           {/* Option 2: Dual */}
           <button 
             onClick={() => onSelect('DUAL')}
             className="w-full bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl flex items-center gap-4 transition-all active:scale-98 group border border-zinc-700 hover:border-yellow-400/50"
           >
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
                 <Layers size={24} className="text-white group-hover:text-black" />
              </div>
              <div className="text-left">
                 <h4 className="font-bold text-white text-lg">Remix & Mashup</h4>
                 <p className="text-xs text-zinc-400">Blend two photos into something new.</p>
              </div>
           </button>
        </div>
      </div>
    </div>
  );
};

export const Home: React.FC<HomeProps> = ({ navigate, onStartGeneration }) => {
  const [showSheet, setShowSheet] = useState(false);
  const heroTrend = TRENDS[0];
  const comparisonTrends = [...TRENDS, ...TRENDS];

  const handleEffectClick = () => {
    setShowSheet(true);
  };

  const handleSelection = (mode: GenMode) => {
    setShowSheet(false);
    onStartGeneration(mode);
  };

  return (
    <ScreenContainer>
      {/* Top Header */}
      <div className="px-6 pt-8 pb-6 flex justify-between items-center z-20 relative">
        <h1 className="text-3xl font-black italic tracking-tighter">
          SUPA<span className="text-yellow-400">CAM</span>
        </h1>
        <button 
          onClick={() => navigate(ScreenName.PAYWALL)}
          className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wide hover:bg-white/20 transition-all active:scale-95"
        >
          <Crown size={14} className="text-yellow-400" fill="currentColor" />
          <span>Pro</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-28 scrollbar-hide">
        
        {/* HERO SECTION */}
        <div className="px-6 mb-10 mt-2">
           <div 
             onClick={handleEffectClick}
             className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden group cursor-pointer shadow-2xl border border-white/10"
           >
              <img src={heroTrend.after} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="hero" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

              <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-xl border border-white/10 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-widest shadow-lg">
                 Trending #1
              </div>

              <div className="absolute bottom-0 left-0 w-full p-[14px]">
                 <h2 className="text-3xl font-black italic leading-[0.9] mb-2 text-white tracking-tight">
                   {heroTrend.title}
                 </h2>
                 <p className="text-zinc-300 text-xs mb-4 line-clamp-2 font-medium opacity-80">{heroTrend.desc}. Tap to transform your reality.</p>
                 
                 <button className="w-full bg-white text-black py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors shadow-xl">
                    <Zap size={16} fill="currentColor" />
                    Use this Effect
                 </button>
              </div>
           </div>
        </div>

        {/* CTA Banner */}
        <div className="px-6 mb-12">
           <div className="group relative w-full rounded-[32px] p-[1px] bg-gradient-to-br from-yellow-300 via-orange-500 to-yellow-600 shadow-2xl shadow-yellow-500/10 overflow-hidden cursor-pointer" onClick={() => navigate(ScreenName.PAYWALL)}>
              <div className="relative bg-zinc-900/90 backdrop-blur-xl rounded-[31px] p-6 overflow-hidden">
                 <div className="absolute -top-20 -right-20 w-56 h-56 bg-yellow-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                 <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                 <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg shadow-orange-500/20 transform group-hover:scale-110 transition-transform duration-300">
                       <Crown size={28} className="text-black fill-black/20" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-3xl font-black italic text-white mb-2 tracking-tight leading-none">
                      UNLOCK <span className="text-yellow-400">PRO</span>
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-6 opacity-90">
                       <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-300">4K Export</span>
                       <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-300">No Ads</span>
                       <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-300">500+ Styles</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-orange-500/20 animate-gradient flex items-center justify-center gap-2">
                       <Sparkles size={14} fill="currentColor"/>
                       Get Started
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Trends List */}
        <div className="px-6 pb-6">
           <div className="flex items-center gap-2 mb-6">
              <Flame size={24} className="text-orange-500" fill="currentColor"/>
              <h2 className="text-2xl font-bold tracking-tight">Hot Right Now</h2>
           </div>
           <div className="flex flex-col gap-10">
              {comparisonTrends.map((trend, i) => (
                 <div key={i} onClick={handleEffectClick} className="group cursor-pointer">
                    <div className="flex gap-2 mb-5 h-52 w-full">
                        <div className="relative flex-1 rounded-l-[24px] rounded-r-[4px] overflow-hidden">
                            <img src={trend.before} className="w-full h-full object-cover opacity-70 transition-opacity group-hover:opacity-100 duration-500" alt="before" />
                            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">Before</div>
                        </div>
                        <div className="relative flex-1 rounded-l-[4px] rounded-r-[24px] overflow-hidden shadow-2xl">
                            <img src={trend.after} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" alt="after" />
                            <div className="absolute top-3 left-3 bg-yellow-400 text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-lg">After</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-2">
                        <div className="pr-4">
                           <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">{trend.title}</h3>
                           <p className="text-sm text-zinc-400 font-medium">{trend.desc}</p>
                        </div>
                        <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 flex-shrink-0 border border-white/5">Try now</button>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>

      <TabBar currentScreen={ScreenName.HOME} onNavigate={navigate} />
      
      <SelectionSheet isOpen={showSheet} onClose={() => setShowSheet(false)} onSelect={handleSelection} />
    </ScreenContainer>
  );
};