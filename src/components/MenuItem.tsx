'use client';

import React from 'react';
import { MenuItem as MenuItemType } from '@/types/menu';
import { MenuBadge } from './MenuBadge';

interface MenuItemProps {
  item: MenuItemType;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const getPriceDisplay = () => {
    const prices = [];
    if (item.priceSmall) prices.push({ size: 'Small', price: item.priceSmall });
    if (item.priceMedium) prices.push({ size: 'Medium', price: item.priceMedium });
    if (item.priceRegular) prices.push({ size: 'Regular', price: item.priceRegular });
    if (item.priceLarge) prices.push({ size: 'Large', price: item.priceLarge });
    return prices;
  };

  const getItemClasses = () => {
    let classes = "bg-white mx-0 my-3 p-6 rounded-2xl border-l-4 shadow-lg transition-all duration-300 relative hover:shadow-xl hover:border-l-orange-500";
    
    if (item.chefSpecial && item.bestSeller) {
      classes += " border-l-purple-600 bg-gradient-to-r from-white via-purple-50 to-white hover:shadow-purple-200/50";
    } else if (item.chefSpecial) {
      classes += " border-l-purple-600 bg-gradient-to-r from-white via-purple-50 to-white hover:shadow-purple-200/50";
    } else if (item.bestSeller) {
      classes += " border-l-yellow-500 bg-gradient-to-r from-white via-yellow-50 to-white hover:shadow-yellow-200/50";
    } else {
      classes += " border-l-red-400 hover:shadow-red-200/50";
    }
    
    return classes;
  };

  return (
    <li className={getItemClasses()}>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div className="font-bold text-xl text-gray-800 flex-1 pr-4 group">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-300">
                {item.itemName}
              </span>
              <MenuBadge item={item} />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            {getPriceDisplay().map(({ size, price }, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-red-400 via-orange-500 to-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300 hover:from-red-500 hover:to-orange-600"
              >
                {size} ₹{price}
              </span>
            ))}
          </div>
        </div>
        
        {item.description && (
          <div className="text-gray-600 text-sm leading-relaxed italic relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-orange-400 to-red-400 rounded-full opacity-60"></div>
            <div className="pl-4">
              {item.description}
            </div>
          </div>
        )}
      </div>
    </li>
  );
};
