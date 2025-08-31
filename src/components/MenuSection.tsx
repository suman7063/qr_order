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
    <div className="bg-white bg-opacity-95 rounded-3xl p-8 shadow-xl backdrop-blur-sm animate-fade-in">
      <h2 className="text-3xl text-gray-800 mb-6 text-center relative pb-4">
        {searchQuery.trim() ? `Search Results for "${searchQuery}"` : currentSection}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-red-400 to-orange-500 rounded-full"></div>
      </h2>

      {Object.keys(displayData).length === 0 ? (
        <div className="text-center py-12 text-gray-500 italic text-lg">
          No items found. Try searching with different keywords.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.keys(displayData).map(section =>
            Object.keys(displayData[section] || {}).map(category => (
              <div
                key={`${section}-${category}`}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-md transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-orange-500 inline-block">
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
