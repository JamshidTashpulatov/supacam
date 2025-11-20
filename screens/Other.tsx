import React, { useState } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import { TabBar } from '../components/TabBar';
import { ScreenName } from '../types';
import { ChevronRight, Crown, AlertCircle, Ghost, Bell, Share2, Star, FileText, HelpCircle, X, Copy, Instagram, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '../components/Button';

// ---------------- Reusable Action Sheet ----------------
interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ActionSheet: React.FC<ActionSheetProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-zinc-900 w-full rounded-t-[30px] p-6 pb-10 relative z-10 animate-slide-up border-t border-zinc-800">
        
        <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-6 opacity-50"></div>
        
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-xl font-bold text-white">{title}</h3>
           <button onClick={onClose} className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white">
             <X size={20} />
           </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
           {children}
        </div>
      </div>
    </div>
  );
};

// ---------------- Library ----------------
export const Library: React.FC<{ navigate: (s: ScreenName) => void }> = ({ navigate }) => {
  const images = Array.from({ length: 6 }, (_, i) => `https://picsum.photos/id/${i+200}/300/400`);

  return (
    <ScreenContainer>
       <div className="px-6 pt-8 mb-6">
         <h1 className="text-3xl font-bold">Your Gallery</h1>
       </div>
       
       {images.length > 0 ? (
         <div className="grid grid-cols-2 gap-4 px-6 pb-32 overflow-y-auto scrollbar-hide">
           {images.map((src, i) => (
             <div key={i} onClick={() => navigate(ScreenName.RESULT)} className="rounded-xl overflow-hidden aspect-[3/4] relative group cursor-pointer">
                <img src={src} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="lib"/>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
             </div>
           ))}
         </div>
       ) : (
         <div className="flex-1 flex flex-col items-center justify-center opacity-50 pb-20">
            <Ghost size={48} className="mb-4"/>
            <p>Nothing here yet.</p>
         </div>
       )}
       <TabBar currentScreen={ScreenName.LIBRARY} onNavigate={navigate} />
    </ScreenContainer>
  );
};

// ---------------- Settings ----------------
type SheetType = 'share' | 'rate' | 'support' | 'privacy' | 'terms' | null;

export const SettingsScreen: React.FC<{ navigate: (s: ScreenName) => void }> = ({ navigate }) => {
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);
  const [pushEnabled, setPushEnabled] = useState(true);

  const closeSheet = () => setActiveSheet(null);

  // Custom Switch Component
  const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(); }} 
      className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ${checked ? 'bg-green-500' : 'bg-zinc-700'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  // Setting Row Component
  const SettingItem = ({ 
    icon: Icon, 
    label, 
    onClick, 
    isPro = false, 
    isToggle = false, 
    toggleValue = false, 
    onToggle = () => {} 
  }: any) => (
    <div 
      onClick={!isToggle ? onClick : undefined} 
      className="w-full flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-800 first:rounded-t-2xl last:rounded-b-2xl last:border-0 hover:bg-zinc-800 transition-colors cursor-pointer select-none"
    >
       <div className="flex items-center gap-4">
         {Icon && <Icon size={20} className="text-zinc-400"/>}
         <span className={isPro ? "font-bold text-yellow-400" : "font-medium text-white"}>{label}</span>
       </div>
       <div className="flex items-center gap-2 text-zinc-500">
         {isPro && <span className="text-[10px] bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded uppercase font-bold">Upgrade</span>}
         
         {isToggle ? (
           <Switch checked={toggleValue} onChange={onToggle} />
         ) : (
           <ChevronRight size={16} />
         )}
       </div>
    </div>
  );

  return (
    <ScreenContainer>
       <div className="px-6 pt-8 mb-8">
         <h1 className="text-3xl font-bold">Settings</h1>
       </div>

       <div className="px-6 space-y-8">
          <div>
             <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 pl-2">Subscription</h3>
             <div className="flex flex-col shadow-lg">
               <SettingItem icon={Crown} label="Unlock Pro Features" isPro onClick={() => navigate(ScreenName.PAYWALL)} />
               <SettingItem label="Restore Purchase" onClick={() => {}} />
             </div>
          </div>

          <div>
             <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 pl-2">App</h3>
             <div className="flex flex-col shadow-lg">
               {/* Notification Toggle Row */}
               <SettingItem 
                  icon={Bell} 
                  label="Notifications" 
                  isToggle={true} 
                  toggleValue={pushEnabled} 
                  onToggle={() => setPushEnabled(!pushEnabled)} 
               />
               <SettingItem icon={Share2} label="Share with friends" onClick={() => setActiveSheet('share')} />
               <SettingItem icon={Star} label="Rate us" onClick={() => setActiveSheet('rate')} />
             </div>
          </div>

          <div>
             <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 pl-2">Support</h3>
             <div className="flex flex-col shadow-lg">
               <SettingItem icon={HelpCircle} label="Help Center" onClick={() => setActiveSheet('support')} />
               <SettingItem icon={FileText} label="Privacy Policy" onClick={() => setActiveSheet('privacy')} />
               <SettingItem icon={FileText} label="Terms of Service" onClick={() => setActiveSheet('terms')} />
             </div>
          </div>
       </div>
       
       <div className="mt-auto pb-32 px-6 text-center text-zinc-600 text-xs">
          SUPACAM v1.0.0 (Prototype)
       </div>

       <TabBar currentScreen={ScreenName.SETTINGS} onNavigate={navigate} />

       {/* ---- SHEETS ---- */}

       {/* Share Sheet */}
       <ActionSheet isOpen={activeSheet === 'share'} onClose={closeSheet} title="Share App">
          <div className="grid grid-cols-4 gap-4">
             
             {/* Copy Link */}
             <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform group-active:scale-95 bg-zinc-800 group-hover:bg-zinc-700">
                   <Copy size={24} />
                </div>
                <span className="text-xs text-zinc-400">Copy Link</span>
             </div>

             {/* Instagram - Brand Gradient */}
             <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform group-active:scale-95 bg-gradient-to-tr from-[#f09433] via-[#bc1888] to-[#2f1ce0] shadow-lg">
                   <Instagram size={24} />
                </div>
                <span className="text-xs text-zinc-400">Instagram</span>
             </div>

             {/* WhatsApp - Brand Green */}
             <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform group-active:scale-95 bg-[#25D366] shadow-lg">
                   <MessageCircle size={24} />
                </div>
                <span className="text-xs text-zinc-400">WhatsApp</span>
             </div>

             {/* More */}
             <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform group-active:scale-95 bg-zinc-800 group-hover:bg-zinc-700">
                   <MoreHorizontal size={24} />
                </div>
                <span className="text-xs text-zinc-400">More</span>
             </div>

          </div>
       </ActionSheet>

       {/* Rate Sheet */}
       <ActionSheet isOpen={activeSheet === 'rate'} onClose={closeSheet} title="Rate Supacam">
          <div className="flex flex-col items-center text-center">
             {/* Bouncing Star Icon */}
             <div className="mb-4 p-4 bg-yellow-400/10 rounded-full animate-bounce-slow">
               <Star size={48} className="text-yellow-400 fill-yellow-400" />
             </div>

             <h3 className="text-xl font-bold text-white mb-2">Love Supacam?</h3>
             <p className="text-zinc-400 mb-8 max-w-[80%]">Your support keeps the updates and new styles coming!</p>
             
             {/* Interactive Stars */}
             <div className="flex gap-3 mb-8 group">
               {[1,2,3,4,5].map(i => (
                 <Star 
                   key={i} 
                   size={36} 
                   className="text-zinc-700 fill-zinc-700 cursor-pointer transition-all duration-200 hover:text-yellow-400 hover:fill-yellow-400 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                   // Simple hover logic simulation (CSS hover handles basic, this is for show)
                 />
               ))}
             </div>

             <Button onClick={closeSheet} className="w-full mb-4">Submit Review</Button>
             <button onClick={closeSheet} className="text-sm text-zinc-500 font-medium hover:text-white">No thanks</button>
          </div>
       </ActionSheet>

        {/* Text Content Sheets */}
        <ActionSheet isOpen={activeSheet === 'support' || activeSheet === 'privacy' || activeSheet === 'terms'} onClose={closeSheet} title={activeSheet === 'support' ? "Help Center" : "Legal"}>
          <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
             <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
             <Button onClick={closeSheet} variant="secondary" className="mt-4">Close</Button>
          </div>
       </ActionSheet>

    </ScreenContainer>
  );
};

// ---------------- Error / Empty States ----------------
export const ErrorState: React.FC<{ type: 'gen' | 'net', navigate: (s: ScreenName) => void }> = ({ type, navigate }) => (
  <ScreenContainer hideStatusBar className="items-center justify-center px-8 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500">
         <AlertCircle size={40} />
      </div>
      <h2 className="text-2xl font-bold mb-2">{type === 'gen' ? 'Something went off vibe' : 'No Internet'}</h2>
      <p className="text-zinc-400 mb-8">{type === 'gen' ? 'The AI hiccuped. Give it another shot.' : 'Check your connection and try again.'}</p>
      <Button onClick={() => navigate(ScreenName.HOME)}>Try Again</Button>
  </ScreenContainer>
);

export const EmptyState: React.FC<{ navigate: (s: ScreenName) => void }> = ({ navigate }) => (
  <ScreenContainer onBack={() => navigate(ScreenName.HOME)} className="items-center justify-center px-8 text-center">
      <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6 text-zinc-500">
         <Ghost size={40} />
      </div>
      <h2 className="text-2xl font-bold mb-2">It's lonely here</h2>
      <p className="text-zinc-400 mb-8">No trends found in this category.</p>
      <Button onClick={() => navigate(ScreenName.HOME)}>Go Back</Button>
  </ScreenContainer>
);
