'use client';

import React from 'react';
import { Star, ChefHat } from 'lucide-react';
import { MenuItem } from '@/types/menu';

interface MenuBadgeProps {
  item: MenuItem;
}

export const MenuBadge: React.FC<MenuBadgeProps> = ({ item }) => {
  if (!item.bestSeller && !item.chefSpecial) return null;

  return (
    <div className="flex items-center gap-2">
      {item.bestSeller && (
        <div className="hover:scale-110 transition-all duration-300 transform-gpu cursor-help" title="Best Seller">
          <Star className="w-6 h-6 text-[#6B7C65]" fill="currentColor" />
        </div>
      )}
      {item.chefSpecial && (
        <div className="hover:scale-110 transition-all duration-300 transform-gpu cursor-help" title="Chef's Special">
          <ChefHat className="w-6 h-6 text-[#6B7C65]" fill="currentColor" />
        </div>
      )}
    </div>
  );
};
