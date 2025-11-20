import React, { useState } from 'react';
import { ScreenName, PaywallVariant, GenMode } from './types';
import { PAYWALL_VARIANTS } from './constants';

// Screens
import { Splash } from './screens/Splash';
import { Onboarding } from './screens/Onboarding';
import { GenderSelection } from './screens/Setup';
import { Paywall } from './screens/Paywall';
import { Home } from './screens/Home';
import { PhotoPicker, DualPhotoPicker } from './screens/Pickers';
import { GenerateScreen, LoadingScreen } from './screens/Generator';
import { ResultScreen } from './screens/Result';
import { Library, SettingsScreen, ErrorState, EmptyState } from './screens/Other';

const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenName>(ScreenName.SPLASH);
  const [paywallIndex, setPaywallIndex] = useState(0);

  // Generation State
  const [genMode, setGenMode] = useState<GenMode>('SINGLE');
  const [uploadedImages, setUploadedImages] = useState<{1: string | null, 2: string | null}>({1: null, 2: null});
  const [activeSlot, setActiveSlot] = useState<1 | 2>(1);

  const navigate = (nextScreen: ScreenName) => {
    setScreen(nextScreen);
  };

  const handleSelectImage = (url: string) => {
    setUploadedImages(prev => ({ ...prev, [activeSlot]: url }));
    navigate(ScreenName.GENERATE);
  };

  const openPickerForSlot = (slot: 1 | 2) => {
    setActiveSlot(slot);
    navigate(ScreenName.PHOTO_PICKER);
  };

  const startGeneration = (mode: GenMode) => {
    setGenMode(mode);
    setUploadedImages({ 1: null, 2: null }); // Reset images on new flow
    navigate(ScreenName.GENERATE);
  };

  // Render Current Screen
  const renderScreen = () => {
    switch (screen) {
      case ScreenName.SPLASH:
        return <Splash onFinish={() => navigate(ScreenName.ONBOARDING)} />;
      
      case ScreenName.ONBOARDING:
        return <Onboarding onFinish={() => navigate(ScreenName.GENDER)} />;
      
      case ScreenName.GENDER:
        return <GenderSelection onNext={() => navigate(ScreenName.PAYWALL)} />;
      
      case ScreenName.PAYWALL:
        return (
          <Paywall 
            variant={PAYWALL_VARIANTS[paywallIndex]} 
            onContinue={() => {
              setPaywallIndex((prev) => (prev + 1) % PAYWALL_VARIANTS.length);
              navigate(ScreenName.HOME);
            }} 
          />
        );
      
      case ScreenName.HOME:
        return <Home navigate={navigate} onStartGeneration={startGeneration} />;
      
      case ScreenName.PHOTO_PICKER:
        return <PhotoPicker navigate={navigate} onSelect={handleSelectImage} />;
      
      // Legacy / Unused for now in new flow but kept for compatibility
      case ScreenName.DUAL_PHOTO_PICKER:
        return <DualPhotoPicker navigate={navigate} />;
      
      case ScreenName.GENERATE:
        return (
          <GenerateScreen 
            navigate={navigate} 
            mode={genMode}
            images={uploadedImages}
            onSlotClick={openPickerForSlot}
          />
        );
        
      case ScreenName.LOADING:
        return <LoadingScreen navigate={navigate} />;
        
      case ScreenName.RESULT:
        return <ResultScreen navigate={navigate} />;
        
      case ScreenName.LIBRARY:
        return <Library navigate={navigate} />;
        
      case ScreenName.SETTINGS:
        return <SettingsScreen navigate={navigate} />;
        
      case ScreenName.ERROR_GEN:
        return <ErrorState type="gen" navigate={navigate} />;
        
      case ScreenName.ERROR_NET:
        return <ErrorState type="net" navigate={navigate} />;
      
      case ScreenName.EMPTY_TRENDS:
        return <EmptyState navigate={navigate} />;
        
      case ScreenName.EMPTY_LIB: 
        return <Library navigate={navigate} />;

      default:
        return <Splash onFinish={() => navigate(ScreenName.HOME)} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center font-sans p-4 sm:p-8">
      <div className="relative w-[393px] h-[852px] bg-black rounded-[40px] overflow-hidden border-[10px] border-black shadow-2xl">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;