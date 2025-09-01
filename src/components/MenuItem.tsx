'use client';

import React from 'react';
import { MenuItem as MenuItemType } from '@/types/menu';
import { MenuBadge } from './MenuBadge';
import { useClickTracking } from '@/hooks/useClickTracking';

interface MenuItemProps {
  item: MenuItemType;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { handleClick } = useClickTracking();
  const getPriceDisplay = () => {
    const prices = [];
    if (item.priceSmall) prices.push({ size: 'Small', price: item.priceSmall });
    if (item.priceMedium) prices.push({ size: 'Medium', price: item.priceMedium });
    if (item.priceRegular) prices.push({ size: 'Regular', price: item.priceRegular });
    if (item.priceLarge) prices.push({ size: 'Large', price: item.priceLarge });
    return prices;
  };

  const getItemClasses = () => {
    let classes = "bg-white/80 backdrop-blur-sm mx-0 my-4 p-4 md:p-6 rounded-2xl border-l-4 shadow-lg transition-all duration-300 relative hover:shadow-xl hover:border-l-[#6B7C65]";
    
    if (item.chefSpecial && item.bestSeller) {
      classes += " border-l-[#6B7C65] bg-gradient-to-r from-white/90 via-[#E8E6D9]/50 to-white/90 hover:shadow-[#6B7C65]/20";
    } else if (item.chefSpecial) {
      classes += " border-l-[#6B7C65] bg-gradient-to-r from-white/90 via-[#E8E6D9]/50 to-white/90 hover:shadow-[#6B7C65]/20";
    } else if (item.bestSeller) {
      classes += " border-l-[#6B7C65] bg-gradient-to-r from-white/90 via-[#E8E6D9]/50 to-white/90 hover:shadow-[#6B7C65]/20";
    } else {
      classes += " border-l-[#9CAF88] hover:shadow-[#9CAF88]/20";
    }
    
    return classes;
  };

  const handleItemClick = () => {
    handleClick('menu_item_view', {
      itemName: item.itemName,
      category: item.category,
      price: item.priceRegular || item.priceMedium || item.priceSmall || item.priceLarge,
      isChefSpecial: item.chefSpecial,
      isBestSeller: item.bestSeller,
      hasDescription: !!item.description
    });
  };

  return (
    <li className={getItemClasses()} onClick={handleItemClick}>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="font-semibold text-xl text-[#2C3E50] flex-1 pr-4 group">
            <div className="flex items-center gap-3">
              <span className="text-[#2C3E50] group-hover:text-[#6B7C65] transition-all duration-300">
                {item.itemName}
              </span>
              <MenuBadge item={item} />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            {getPriceDisplay().map(({ size, price }, index) => (
              <span
                key={index}
                className="bg-[#6B7C65] text-white px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#5A6C7D]"
              >
                {size} ₹{price}
              </span>
            ))}
          </div>
        </div>
        
        {item.description && (
          <div className="text-[#5A6C7D] text-sm leading-relaxed relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-[#9CAF88] rounded-full opacity-60"></div>
            <div className="pl-4">
              {item.description}
            </div>
          </div>
        )}
      </div>
    </li>
  );
};
