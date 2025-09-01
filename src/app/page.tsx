"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useMenuData } from "@/hooks/useMenuData";
import { SearchBar } from "@/components/SearchBar";
import { Navigation } from "@/components/Navigation";
import { MenuSection } from "@/components/MenuSection";
import { SpecialTables } from "@/components/SpecialTables";
import { Footer } from "@/components/Footer";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";
import { SearchItem, MenuData } from "@/types/menu";
import { useClickTracking } from "@/hooks/useClickTracking";

export default function RestaurantMenu() {
  const { menuData, loading, error } = useMenuData();
  const [currentSection, setCurrentSection] = useState<string>("South Indian");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isTaglineVisible, setIsTaglineVisible] = useState<boolean>(true);
  const { handleClick } = useClickTracking();

  // Scroll effect for tagline visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show only at top, hide after 100px scroll
      setIsTaglineVisible(currentScrollY <= 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create search items
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];
    Object.keys(menuData).forEach((section) => {
      Object.keys(menuData[section]).forEach((category) => {
        menuData[section][category].forEach((item) => {
          items.push({
            item: item.itemName,
            category: category,
            section: section,
            fullItem: item,
          });
        });
      });
    });
    return items;
  }, [menuData]);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const results = allItems.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.item.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.section.toLowerCase().includes(query)
      );
    });

    // Track search results
    if (searchQuery.trim() && results.length > 0) {
      handleClick("search_results", {
        query: searchQuery,
        resultCount: results.length,
        hasResults: true,
        resultCategories: [...new Set(results.map((item) => item.category))],
        resultSections: [...new Set(results.map((item) => item.section))],
      });
    } else if (searchQuery.trim() && results.length === 0) {
      handleClick("search_no_results", {
        query: searchQuery,
        resultCount: 0,
        hasResults: false,
      });
    }

    return results;
  }, [allItems, searchQuery, handleClick]);

  // Group search results
  const groupSearchResults = (items: SearchItem[]): MenuData => {
    const grouped: MenuData = {};
    items.forEach((item) => {
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
      <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#E8E6D9] to-[#9CAF88] flex items-center justify-center">
        <BackgroundAnimation />
        <div className="text-[#2C3E50] text-xl font-medium">
          Loading menu...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#E8E6D9] to-[#9CAF88] flex items-center justify-center">
        <BackgroundAnimation />
        <div className="text-[#2C3E50] text-xl text-center max-w-md">
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
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#E8E6D9] to-[#9CAF88] relative">
      <BackgroundAnimation />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md p-2 md:p-6 text-center shadow-lg border-b border-[#D4D7C7] sticky top-0 z-20">
        <div className="flex items-center justify-center gap-1 md:gap-2">
          <Image
            src="/logo.jpeg"
            alt="Sagars Cafe"
            width={80}
            height={80}
            className="md:w-20 md:h-20 w-10 h-10 rounded-full shadow-md"
          />
          <h1 className="text-2xl md:text-5xl font-bold text-[#2C3E50] tracking-tight">
            Sagars Cafe
          </h1>
        </div>
        <p 
          className={`text-sm md:text-lg text-[#5A6C7D] font-light leading-tight transition-all duration-300 ease-in-out ${
            isTaglineVisible 
              ? 'opacity-100 max-h-8 mt-2' 
              : 'opacity-0 max-h-0 overflow-hidden '
          }`}
        >
          Authentic Flavors • Fresh Ingredients • Made with Love
        </p>
      </header>

      {/* Fixed floating special banner - responsive */}
      <div className="hidden md:block fixed top-26 right-4 z-30">
        <SpecialTables menuData={menuData} />
      </div>

      <div className="md:hidden mt-4 px-2">
        <SpecialTables menuData={menuData} />
      </div>

      <div className="container mx-auto max-w-6xl md:p-4 p-2 relative z-10">
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

      <Footer />
    </div>
  );
}
