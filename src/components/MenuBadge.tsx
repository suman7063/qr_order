'use client';

import React from 'react';
import { MenuItem } from '@/types/menu';

interface MenuBadgeProps {
  item: MenuItem;
}

export const MenuBadge: React.FC<MenuBadgeProps> = ({ item }) => {
  if (!item.bestSeller && !item.chefSpecial) return null;

  return (
    <div className="absolute -top-2 -right-2 flex flex-col gap-1 z-10">
      {item.bestSeller && (
        <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-xl text-xs font-semibold uppercase tracking-wide shadow-lg flex items-center gap-1">
          <span className="text-xs">🏆</span>
          Best Seller
        </span>
      )}
      {item.chefSpecial && (
        <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-2 py-1 rounded-xl text-xs font-semibold uppercase tracking-wide shadow-lg flex items-center gap-1">
          <span className="text-xs">⭐</span>
          Chef&apos;s Special
        </span>
      )}
    </div>
  );
};
