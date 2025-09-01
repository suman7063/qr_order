'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MenuData } from '@/types/menu';
import { MenuItem } from './MenuItem';

interface SpecialTablesProps {
  menuData: MenuData;
}

export const SpecialTables: React.FC<SpecialTablesProps> = ({ menuData }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extract only today's special items
  const todaysSpecials: Array<{ item: any; section: string; category: string }> = [];

  // Collect today's special items from all sections and categories
  Object.keys(menuData).forEach(section => {
    Object.keys(menuData[section]).forEach(category => {
      menuData[section][category].forEach(item => {
        if (item.todaysSpecial) {
          todaysSpecials.push({ item, section, category });
        }
      });
    });
  });

  // Only show the component if there are today's special items
  if (todaysSpecials.length === 0) {
    return null;
  }

  return (
    <>
      {/* Banner */}
      <div className="md:mb-8 mb-2">
        <div 
          className="bg-gradient-to-r from-[#9CAF88] to-[#6B7C65] rounded-2xl py-2 px-4 md:p-6  shadow-lg border-2 border-[#D4D7C7] cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          onClick={() => setIsDrawerOpen(true)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="text-2xl md:text-3xl">🍛</div>
              <div>
                <h3 className="md:text-2xl text-xl font-bold text-white md:mb-1">Today's Specials</h3>
                <p className="text-[#E8E6D9] text-sm">
                  {todaysSpecials.length} special item{todaysSpecials.length !== 1 ? 's' : ''} available today!
                </p>
              </div>
            </div>
            <div className="text-white text-lg md:text-2xl">
              ▶
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Portal */}
      {mounted && createPortal(
        <>
          {/* Drawer Overlay */}
          {isDrawerOpen && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsDrawerOpen(false)}
              style={{ zIndex: 999999 }}
            />
          )}

          {/* Drawer - Positioned to cover header */}
          <div 
            className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
              isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ zIndex: 1000000 }}
          >
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-[#9CAF88] to-[#6B7C65] p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🍛</div>
                  <h2 className="text-2xl font-bold">Today's Specials</h2>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-white hover:text-[#E8E6D9] transition-colors duration-200 text-2xl font-bold bg-white/20 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
              <p className="text-[#E8E6D9] text-sm">
                {todaysSpecials.length} special item{todaysSpecials.length !== 1 ? 's' : ''} available today!
              </p>
            </div>

            {/* Drawer Content */}
            <div className=" px-2 py-4 md:p-6 overflow-y-auto h-[calc(100vh-120px)]">
              <div className="space-y-4">
                {todaysSpecials.map(({ item, section, category }, index) => (
                  <div
                    key={`${item.itemName}-${index}`}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-[#D4D7C7] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-[#2C3E50]">
                        {item.itemName}
                      </h3>
                      <span className="text-[#5A6C7D] text-xs bg-[#E8E6D9] px-2 py-1 rounded-full text-nowrap">
                        {section} • {category}
                      </span>
                    </div>
                    <p className="text-[#5A6C7D] text-sm mb-3">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-[#2C3E50] font-bold">
                        {item.priceRegular && `₹${item.priceRegular}`}
                        {item.priceSmall && `₹${item.priceSmall}`}
                        {item.priceMedium && `₹${item.priceMedium}`}
                        {item.priceLarge && `₹${item.priceLarge}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
};
