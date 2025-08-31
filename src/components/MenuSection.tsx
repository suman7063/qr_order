'use client';

import React from 'react';
import { MenuData } from '@/types/menu';
import { MenuItem } from './MenuItem';

interface MenuSectionProps {
  displayData: MenuData;
  searchQuery: string;
  currentSection: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ 
  displayData, 
  searchQuery, 
  currentSection 
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl px-4 py-6 md:p-8 shadow-lg border border-[#D4D7C7] animate-fade-in">
      <h2 className="text-3xl text-[#2C3E50] mb-8 text-center relative pb-4 font-semibold tracking-wide">
        {searchQuery.trim() ? `Search Results for "${searchQuery}"` : currentSection}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#6B7C65] rounded-full"></div>
      </h2>

      {Object.keys(displayData).length === 0 ? (
        <div className="text-center py-12 text-[#8A9BA8] italic text-lg">
          No items found. Try searching with different keywords.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.keys(displayData).map(section =>
            Object.keys(displayData[section] || {}).map(category => (
              <div
                key={`${section}-${category}`}
                className="md:bg-white/50 md:backdrop-blur-sm rounded-2xl md:p-6 md:shadow-md transition-transform duration-300 hover:-translate-y-1 md:border border-[#D4D7C7]"
              >
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-4 pb-3 border-b-2 border-[#6B7C65] inline-block">
                  {category} {searchQuery.trim() && `(${section})`}
                </h3>
                <ul className="space-y-0">
                  {displayData[section][category].map((item, index) => (
                    <MenuItem key={`${item.itemName}-${index}`} item={item} />
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
