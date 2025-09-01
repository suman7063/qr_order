'use client';

import React from 'react';
import { useClickTracking } from '@/hooks/useClickTracking';

interface NavigationProps {
  sections: string[];
  currentSection: string;
  setCurrentSection: (section: string) => void;
  searchQuery: string;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  sections, 
  currentSection, 
  setCurrentSection, 
  searchQuery 
}) => {
  const { handleClick } = useClickTracking();

  if (searchQuery.trim()) return null;

  const handleSectionClick = (section: string) => {
    handleClick('navigation_section', { section, previousSection: currentSection });
    setCurrentSection(section);
  };

  return (
    <nav className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4 p-4 md:p-6 bg-white/60 rounded-2xl shadow-lg backdrop-blur-sm border border-[#D4D7C7]">
      {sections.map(section => (
        <button
          key={section}
          onClick={() => handleSectionClick(section)}
          className={`md:px-6 md:py-3 px-4 py-2 rounded-full font-medium text-sm capitalize tracking-wide transition-all duration-300 ${
            section === currentSection
              ? 'bg-[#6B7C65] text-white shadow-md transform -translate-y-0.5'
              : 'bg-white/80 text-[#5A6C7D] hover:bg-[#6B7C65] hover:text-white hover:transform hover:-translate-y-0.5 hover:shadow-md border border-[#D4D7C7]'
          }`}
        >
          {section}
        </button>
      ))}
    </nav>
  );
};
