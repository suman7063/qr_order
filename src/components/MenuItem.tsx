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
    let classes = "bg-white mx-0 my-2 p-4 rounded-lg border-l-4 shadow-sm transition-all duration-300 relative hover:translate-x-1 hover:shadow-md hover:border-l-orange-500";
    
    if (item.chefSpecial && item.bestSeller) {
      classes += " border-l-purple-600 bg-gradient-to-r from-white to-purple-50";
    } else if (item.chefSpecial) {
      classes += " border-l-purple-600 bg-gradient-to-r from-white to-purple-50";
    } else if (item.bestSeller) {
      classes += " border-l-yellow-500 bg-gradient-to-r from-white to-yellow-50";
    } else {
      classes += " border-l-red-400";
    }
    
    return classes;
  };

  return (
    <li className={getItemClasses()}>
      <MenuBadge item={item} />
      
      <div className="flex justify-between items-start mb-2">
        <div className="font-bold text-lg text-gray-800 flex-1 pr-4">
          {item.itemName}
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          {getPriceDisplay().map(({ size, price }, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-red-400 to-orange-500 text-white px-3 py-1 rounded-xl text-sm font-semibold whitespace-nowrap"
            >
              {size} ₹{price}
            </span>
          ))}
        </div>
      </div>
      
      {item.description && (
        <div className="text-gray-600 text-sm leading-relaxed italic">
          {item.description}
        </div>
      )}
    </li>
  );
};
