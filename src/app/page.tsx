'use client';

import React, { useState, useMemo } from 'react';
import { useMenuData } from '@/hooks/useMenuData';
import { SearchBar } from '@/components/SearchBar';
import { Navigation } from '@/components/Navigation';
import { MenuSection } from '@/components/MenuSection';
import { SearchItem, MenuData } from '@/types/menu';

export default function RestaurantMenu() {
  const { menuData, loading, error } = useMenuData();
  const [currentSection, setCurrentSection] = useState<string>('South Indian');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Create search items
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];
    Object.keys(menuData).forEach(section => {
      Object.keys(menuData[section]).forEach(category => {
        menuData[section][category].forEach(item => {
          items.push({
            item: item.itemName,
            category: category,
            section: section,
            fullItem: item
          });
        });
      });
    });
    return items;
  }, [menuData]);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return null;
    
    return allItems.filter(item => {
      const query = searchQuery.toLowerCase();
      return (
        item.item.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.section.toLowerCase().includes(query) ||
        item.fullItem.description.toLowerCase().includes(query)
      );
    });
  }, [allItems, searchQuery]);

  // Group search results
  const groupSearchResults = (items: SearchItem[]): MenuData => {
    const grouped: MenuData = {};
    items.forEach(item => {
      if (!grouped[item.section]) {
        grouped[item.section] = {};
      }
      if (!grouped[item.section][item.category]) {
        grouped[item.section][item.category] = [];
      }
      grouped[item.section][item.category].push(item.fullItem);
    });
    return grouped;
  };

  // Set initial section when data loads
  React.useEffect(() => {
    const sections = Object.keys(menuData);
    if (sections.length > 0) {
      if (!sections.includes(currentSection)) {
        setCurrentSection(sections[0]);
      }
    }
  }, [menuData, currentSection]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700 flex items-center justify-center">
        <div className="text-white text-xl font-semibold">Loading menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700 flex items-center justify-center">
        <div className="text-white text-xl text-center max-w-md">
          <div className="mb-4">❌</div>
          <div>{error}</div>
          <div className="mt-4 text-sm opacity-75">
            Make sure your Google Sheet is public and the ID is correct.
          </div>
        </div>
      </div>
    );
  }

  const sections = Object.keys(menuData);
  const displayData = filteredItems 
    ? groupSearchResults(filteredItems) 
    : { [currentSection]: menuData[currentSection] || {} };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700">
      {/* Header */}
      <header className="bg-white bg-opacity-95 backdrop-blur-sm p-8 text-center shadow-xl sticky top-0 z-50">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 drop-shadow-md">
          🍛 South Indian Kitchen
        </h1>
        <p className="text-xl text-gray-600 italic">
          Authentic Flavors • Fresh Ingredients • Made with Love
        </p>
      </header>

      <div className="container mx-auto max-w-6xl p-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <Navigation 
          sections={sections}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          searchQuery={searchQuery}
        />

        <MenuSection 
          displayData={displayData}
          searchQuery={searchQuery}
          currentSection={currentSection}
        />
      </div>
    </div>
  );
}
