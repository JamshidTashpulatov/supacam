import React from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import { ScreenName } from '../types';

// ---------------- Photo Picker ----------------
interface PhotoPickerProps {
  navigate: (s: ScreenName) => void;
  onSelect?: (url: string) => void;
}

export const PhotoPicker: React.FC<PhotoPickerProps> = ({ navigate, onSelect }) => {
  const photos = Array.from({ length: 24 }, (_, i) => `https://picsum.photos/300/400?random=${i + 100}`);

  const handleImageClick = (src: string) => {
    if (onSelect) {
      onSelect(src);
    } else {
      // Fallback legacy behavior if needed
      navigate(ScreenName.GENERATE);
    }
  };

  return (
    <ScreenContainer onBack={() => navigate(ScreenName.GENERATE)} className="pt-24">
      <div className="px-6 mb-4">
        <h2 className="text-2xl font-bold">Select a photo</h2>
      </div>
      <div className="grid grid-cols-3 gap-1 px-1 overflow-y-auto pb-20">
        {photos.map((src, idx) => (
          <div key={idx} onClick={() => handleImageClick(src)} className="aspect-square relative cursor-pointer active:opacity-70">
            <img src={src} className="w-full h-full object-cover" alt="pic" />
          </div>
        ))}
      </div>
    </ScreenContainer>
  );
};

// ---------------- Dual Photo Picker (Legacy/Stub) ----------------
export const DualPhotoPicker: React.FC<{ navigate: (s: ScreenName) => void }> = ({ navigate }) => {
  return (
    <ScreenContainer onBack={() => navigate(ScreenName.HOME)} className="items-center justify-center">
      <p>Use Generate Screen instead.</p>
    </ScreenContainer>
  );
};