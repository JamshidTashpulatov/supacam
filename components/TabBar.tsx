import React from 'react';
import { Home, Images, Settings } from 'lucide-react';
import { ScreenName } from '../types';

interface TabBarProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ currentScreen, onNavigate }) => {
  const tabs = [
    { id: ScreenName.HOME, icon: Home, label: 'Trends' },
    { id: ScreenName.LIBRARY, icon: Images, label: 'Library' },
    { id: ScreenName.SETTINGS, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="h-[85px] w-full bg-black/80 backdrop-blur-xl border-t border-white/10 flex items-start pt-4 justify-around px-6 absolute bottom-0 z-50 pb-8">
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-yellow-400' : 'text-zinc-500'}`}
          >
            <tab.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};