import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'magic';
  className?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className = '',
  fullWidth = true
}) => {
  const baseStyles = "py-4 px-6 rounded-full font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-yellow-400 text-black hover:bg-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.3)]",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    outline: "border-2 border-zinc-700 text-white hover:border-yellow-400 hover:text-yellow-400",
    ghost: "bg-transparent text-zinc-400 hover:text-white",
    magic: "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white shadow-lg shadow-orange-500/20 border-0 animate-gradient"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};