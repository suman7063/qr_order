'use client';

import React from 'react';
import { Star, ChefHat } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/95 backdrop-blur-xl p-6 mt-12 rounded-t-3xl shadow-2xl border-t border-white/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Menu Legend</h3>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="p-1">
                <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
              </div>
              <span className="text-gray-700 font-medium">Best Seller - Our most popular dishes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1">
                <ChefHat className="w-5 h-5 text-purple-600" fill="currentColor" />
              </div>
              <span className="text-gray-700 font-medium">Chef's Special - Unique creations by our chef</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              🍛 South Indian Kitchen • Authentic Flavors • Fresh Ingredients • Made with Love
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
