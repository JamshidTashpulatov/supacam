import React, { useState } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import { Button } from '../components/Button';
import { Gender } from '../types';

// ---------------- Gender Screen ----------------
interface GenderSelectionProps {
  onNext: (gender: Gender) => void;
}

export const GenderSelection: React.FC<GenderSelectionProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<Gender>(null);
  const options: Gender[] = ['Male', 'Female', 'Non-Binary'];

  return (
    <ScreenContainer className="px-6 pt-24">
      <h2 className="text-3xl font-bold mb-2">What is your gender?</h2>
      <p className="text-zinc-400 mb-10">Helps us recommend relevant styles.</p>

      <div className="flex flex-col gap-4">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`p-6 rounded-2xl border text-left transition-all ${
              selected === opt 
                ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400' 
                : 'border-zinc-800 bg-zinc-900 text-white'
            }`}
          >
            <span className="font-semibold text-lg">{opt}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto mb-10">
        <Button onClick={() => onNext(selected)} variant={selected ? 'primary' : 'secondary'}>
          Next
        </Button>
      </div>
    </ScreenContainer>
  );
};