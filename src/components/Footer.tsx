'use client';

import React from 'react';
import { Star, ChefHat } from 'lucide-react';
import { useClickTracking } from '@/hooks/useClickTracking';

export const Footer: React.FC = () => {
  const { handleClick } = useClickTracking();
  return (
    <footer className="bg-white/70 backdrop-blur-md p-8 mt-8 md:mt-12 rounded-t-2xl shadow-lg border-t border-[#D4D7C7]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-[#2C3E50] mb-6 tracking-wide">Menu Legend</h3>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleClick('footer_legend', { type: 'best_seller' })}
            >
              <div className="p-2 bg-[#E8E6D9] rounded-full">
                <Star className="w-5 h-5 text-[#6B7C65]" fill="currentColor" />
              </div>
              <span className="text-[#5A6C7D] font-medium">Best Seller - Our most popular dishes</span>
            </div>
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleClick('footer_legend', { type: 'chef_special' })}
            >
              <div className="p-2 bg-[#E8E6D9] rounded-full">
                <ChefHat className="w-5 h-5 text-[#6B7C65]" fill="currentColor" />
              </div>
              <span className="text-[#5A6C7D] font-medium">Chef's Special - Unique creations by our chef</span>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[#D4D7C7]">
            <p className="text-[#8A9BA8] text-sm font-light">
              🍛 Sagars Cafe • Authentic Flavors • Fresh Ingredients • Made with Love
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
