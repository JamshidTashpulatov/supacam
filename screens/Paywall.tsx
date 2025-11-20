import React, { useState } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import { Button } from '../components/Button';
import { Check, X, Sparkles, Zap, Star, ShieldCheck, BellRing, Lock, Unlock, Smartphone } from 'lucide-react';
import { PaywallVariant } from '../types';

interface PaywallProps {
  variant: PaywallVariant;
  onContinue: () => void;
}

// ---------------- Components ----------------

const TrustBadge = () => (
  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full w-fit mx-auto mb-4 border border-white/5">
    <div className="flex text-yellow-400">
      {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
    </div>
    <span className="text-[10px] font-medium text-white/90">Trusted by 2M+ Creators</span>
  </div>
);

const BenefitRow = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="min-w-[20px] h-5 rounded-full bg-yellow-400/20 flex items-center justify-center">
      <Check size={12} className="text-yellow-400" strokeWidth={3} />
    </div>
    <span className="text-sm font-medium text-zinc-200">{text}</span>
  </div>
);

// ---------------- Variant A: High Impact Visual (The "Converter") ----------------
const PaywallA: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'weekly'>('yearly');
  const [trialEnabled, setTrialEnabled] = useState(true);

  return (
    <div className="flex flex-col h-full relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="https://picsum.photos/id/338/600/1000" className="w-full h-[60%] object-cover" alt="bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/80 to-zinc-950 via-50%"></div>
      </div>

      {/* Close Button */}
      <button 
        onClick={onContinue} 
        className="absolute top-14 right-5 z-50 bg-black/20 backdrop-blur-md p-2 rounded-full text-white/70 hover:text-white border border-white/10"
      >
        <X size={20}/>
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 pt-20 pb-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <TrustBadge />
          <h1 className="text-4xl font-black italic tracking-tight mb-2">
            SUPACAM <span className="text-yellow-400">PRO</span>
          </h1>
          <p className="text-zinc-300 text-sm opacity-90">Unlock your full creative potential.</p>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Features */}
        <div className="space-y-3 mb-8 pl-2">
          <BenefitRow text="Unlimited AI Generations" />
          <BenefitRow text="Access 500+ Premium Styles" />
          <BenefitRow text="4K Ultra HD Export" />
          <BenefitRow text="No Watermarks & No Ads" />
        </div>

        {/* Plan Selector */}
        <div className="grid gap-3 mb-6">
          {/* Yearly Plan */}
          <div 
            onClick={() => setSelectedPlan('yearly')}
            className={`relative p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex justify-between items-center ${
              selectedPlan === 'yearly' 
                ? 'border-yellow-400 bg-yellow-400/10' 
                : 'border-zinc-800 bg-zinc-900/50'
            }`}
          >
            {/* Best Value Badge */}
            <div className="absolute -top-3 right-4 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-lg">
              Save 60%
            </div>

            <div>
              <div className="font-bold text-lg">Yearly Access</div>
              <div className="text-xs text-zinc-400">Just $0.76 / week</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">$39.99</div>
              <div className="text-[10px] text-zinc-400">/ year</div>
            </div>
          </div>

          {/* Weekly Plan */}
          <div 
            onClick={() => setSelectedPlan('weekly')}
            className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex justify-between items-center ${
              selectedPlan === 'weekly' 
                ? 'border-yellow-400 bg-yellow-400/10' 
                : 'border-zinc-800 bg-zinc-900/50'
            }`}
          >
            <div>
              <div className="font-bold text-lg">Weekly Access</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">$4.99</div>
              <div className="text-[10px] text-zinc-400">/ week</div>
            </div>
          </div>
        </div>

        {/* Trial Switch */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="text-sm font-medium text-zinc-300">Enable 3-Day Free Trial</div>
          <button 
            onClick={() => setTrialEnabled(!trialEnabled)}
            className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ${trialEnabled ? 'bg-green-500' : 'bg-zinc-700'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${trialEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* CTA */}
        <Button onClick={onContinue} className="mb-4 relative overflow-hidden shadow-[0_0_20px_rgba(250,204,21,0.4)] animate-pulse-slow">
          <span className="relative z-10">{trialEnabled ? 'Start Free Trial' : 'Continue'}</span>
        </Button>

        {/* Footer Links */}
        <div className="flex justify-center gap-4 text-[10px] text-zinc-500">
          <button>Terms</button>
          <span>•</span>
          <button>Privacy</button>
          <span>•</span>
          <button>Restore</button>
        </div>
      </div>
    </div>
  );
};

// ---------------- Variant B: The Timeline (The "Trust" Builder) ----------------
const PaywallB: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  return (
    <div className="flex flex-col h-full bg-black relative overflow-hidden">
      {/* Top Glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[50%] bg-yellow-400/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="px-6 pt-4 flex justify-between items-center z-20">
         <button onClick={onContinue} className="text-zinc-400 text-xs font-medium hover:text-white">Restore</button>
         <button onClick={onContinue} className="bg-white/10 backdrop-blur-md p-2 rounded-full text-white"><X size={16}/></button>
      </div>
      
      <div className="px-6 pt-8 pb-8 flex flex-col h-full relative z-10">
        <div className="text-center mb-8">
           <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-1.5 mb-4">
              <Sparkles size={12} className="text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Free 7-Day Trial</span>
           </div>
           <h1 className="text-3xl font-black mb-3 leading-tight">
             Keep the <span className="text-yellow-400">Magic</span> Going.
           </h1>
           <p className="text-zinc-400 text-sm max-w-[80%] mx-auto">
             Join Pro to unlock unlimited access. Cancel anytime, no questions asked.
           </p>
        </div>

        {/* The Trust Timeline */}
        <div className="relative pl-4 py-2 mb-6">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-4 bottom-10 w-[2px] bg-zinc-800"></div>

          {/* Step 1: Today */}
          <div className="flex gap-4 mb-8 relative">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.4)] z-10">
               <Unlock size={20} className="text-black stroke-[2.5px]" />
            </div>
            <div>
               <h3 className="font-bold text-white text-lg">Today</h3>
               <p className="text-zinc-400 text-sm mb-1">Instant access to all features.</p>
               <div className="inline-block bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded">Payment: $0.00</div>
            </div>
          </div>

          {/* Step 2: Reminder */}
          <div className="flex gap-4 mb-8 relative">
             <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center z-10">
               <BellRing size={18} className="text-zinc-400" />
             </div>
             <div>
               <h3 className="font-bold text-zinc-200 text-lg">Day 5</h3>
               <p className="text-zinc-400 text-sm">We'll send you a reminder email.</p>
             </div>
          </div>

           {/* Step 3: Start */}
           <div className="flex gap-4 relative">
             <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center z-10">
               <Star size={18} className="text-zinc-400" />
             </div>
             <div>
               <h3 className="font-bold text-zinc-200 text-lg">Day 7</h3>
               <p className="text-zinc-400 text-sm">Trial converts to yearly plan.</p>
               <p className="text-zinc-500 text-xs mt-1">Cancel anytime before this.</p>
             </div>
          </div>
        </div>

        <div className="mt-auto">
          {/* Receipt / Summary Card */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 mb-6">
             <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-3">
                <span className="font-medium text-sm">Total Due Today</span>
                <span className="font-black text-xl text-white">$0.00</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-xs">After 7 days</span>
                <span className="text-zinc-300 text-sm font-medium">$39.99 / year</span>
             </div>
          </div>

          <Button onClick={onContinue} className="w-full relative shadow-[0_0_25px_rgba(250,204,21,0.25)]">
            <div className="flex flex-col items-center leading-none py-1">
               <span className="text-base font-bold text-black">Start Free Trial</span>
            </div>
          </Button>
          
          <div className="flex justify-center items-center gap-2 mt-4 text-[10px] text-zinc-500">
            <ShieldCheck size={12} />
            <span>Secured with FaceID • Cancel anytime in Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- Variant C: Minimal A/B (The "Direct" Approach) ----------------
const PaywallC: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  return (
    <div className="flex flex-col h-full relative bg-black">
       <div className="absolute inset-0 z-0">
         <img src="https://picsum.photos/id/177/600/800" className="w-full h-full object-cover opacity-30" alt="bg"/>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
       </div>

       <button onClick={onContinue} className="absolute top-14 right-5 z-20 bg-white/10 backdrop-blur-md p-2 rounded-full text-white"><X size={20}/></button>

       <div className="relative z-10 mt-auto p-6 pb-10">
         <div className="flex items-center gap-2 text-yellow-400 mb-2 font-bold uppercase tracking-widest text-xs">
           <Sparkles size={14} /> Premium Access
         </div>
         <h2 className="text-5xl font-black mb-6 leading-none">
           Create.<br/>Without<br/>Limits.
         </h2>
         
         <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
               <span className="font-medium">Monthly</span>
               <span className="font-bold">$4.99</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
               <span className="font-medium">Yearly <span className="text-yellow-400 text-xs ml-2">-60% OFF</span></span>
               <span className="font-bold">$39.99</span>
            </div>
         </div>

         <Button onClick={onContinue}>Unlock Everything</Button>
         <button onClick={onContinue} className="w-full text-center mt-4 text-xs text-zinc-500">
           Terms of Service • Privacy Policy
         </button>
       </div>
     </div>
  );
}

export const Paywall: React.FC<PaywallProps> = ({ variant, onContinue }) => {
  return (
    <ScreenContainer hideStatusBar={true}>
      {variant === PaywallVariant.A && <PaywallA onContinue={onContinue} />}
      {variant === PaywallVariant.B && <PaywallB onContinue={onContinue} />}
      {variant === PaywallVariant.C && <PaywallC onContinue={onContinue} />}
    </ScreenContainer>
  );
};