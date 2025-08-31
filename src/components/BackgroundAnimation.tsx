'use client';

import React from 'react';
import { 
  ChefHat, 
  Utensils, 
  Coffee, 
  Wine, 
  Apple, 
  Carrot, 
  Leaf, 
  Fish, 
  Cookie, 
  Salad,
  Soup,
  Pizza,
  Egg,
  Beef,
  Milk
} from 'lucide-react';

export const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Chef Hat */}
      <div className="absolute top-20 left-10 animate-float-slow opacity-8">
        <ChefHat className="w-8 h-8 text-[#4A5D4A]" />
      </div>

      <div className="absolute top-40 right-20 animate-float-medium opacity-6">
        <ChefHat className="w-6 h-6 text-[#6B7C65]" />
      </div>

      {/* Floating Utensils */}
      <div className="absolute top-60 left-1/4 animate-float-fast opacity-7">
        <Utensils className="w-7 h-7 text-[#4A5D4A]" />
      </div>

      <div className="absolute top-80 right-1/3 animate-float-slow opacity-5">
        <Utensils className="w-5 h-5 text-[#6B7C65]" />
      </div>

      {/* Floating Coffee Cups */}
      <div className="absolute top-32 left-1/3 animate-float-medium opacity-6">
        <Coffee className="w-6 h-6 text-[#4A5D4A]" />
      </div>

      <div className="absolute top-96 left-1/2 animate-float-fast opacity-7">
        <Coffee className="w-5 h-5 text-[#6B7C65]" />
      </div>

      {/* Floating Wine Glasses */}
      <div className="absolute top-48 right-1/4 animate-float-slow opacity-5">
        <Wine className="w-8 h-8 text-[#4A5D4A]" />
      </div>

      <div className="absolute top-72 left-1/5 animate-float-medium opacity-6">
        <Wine className="w-6 h-6 text-[#6B7C65]" />
      </div>

      {/* Floating Food Items */}
      <div className="absolute top-64 right-1/6 animate-float-fast opacity-7">
        <Apple className="w-5 h-5 text-[#4A5D4A]" />
      </div>

      <div className="absolute top-88 left-3/4 animate-float-slow opacity-6">
        <Carrot className="w-6 h-6 text-[#6B7C65]" />
      </div>

      <div className="absolute top-56 right-1/2 animate-float-medium opacity-5">
        <Leaf className="w-7 h-7 text-[#4A5D4A]" />
      </div>

      <div className="absolute top-40 left-1/6 animate-float-fast opacity-6">
        <Fish className="w-5 h-5 text-[#6B7C65]" />
      </div>

      <div className="absolute top-76 right-1/5 animate-float-slow opacity-7">
        <Cookie className="w-6 h-6 text-[#4A5D4A]" />
      </div>

      <div className="absolute top-24 left-2/3 animate-float-medium opacity-5">
        <Salad className="w-7 h-7 text-[#6B7C65]" />
      </div>

      <div className="absolute top-68 left-1/8 animate-float-fast opacity-6">
        <Soup className="w-5 h-5 text-[#4A5D4A]" />
      </div>

      <div className="absolute top-92 right-1/8 animate-float-slow opacity-7">
        <Pizza className="w-6 h-6 text-[#6B7C65]" />
      </div>

      <div className="absolute top-36 right-2/3 animate-float-medium opacity-5">
        <Egg className="w-4 h-4 text-[#4A5D4A]" />
      </div>

      <div className="absolute top-84 left-4/5 animate-float-fast opacity-6">
        <Beef className="w-5 h-5 text-[#6B7C65]" />
      </div>

      <div className="absolute top-52 left-1/10 animate-float-slow opacity-6">
        <Milk className="w-6 h-6 text-[#4A5D4A]" />
      </div>

      <div className="absolute top-28 right-1/10 animate-float-medium opacity-5">
        <Apple className="w-5 h-5 text-[#6B7C65]" />
      </div>
    </div>
  );
};
