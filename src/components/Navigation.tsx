'use client';

import React from 'react';

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
  if (searchQuery.trim()) return null;

  return (
    <nav className="flex flex-wrap justify-center gap-4 mb-12 p-4 bg-white bg-opacity-90 rounded-2xl shadow-xl backdrop-blur-sm">
      {sections.map(section => (
        <button
          key={section}
          onClick={() => setCurrentSection(section)}
          className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 ${
            section === currentSection
              ? 'bg-gradient-to-r from-red-400 to-orange-500 text-white transform -translate-y-1 shadow-lg shadow-orange-300'
              : 'bg-gradient-to-r from-red-400 to-orange-500 text-white hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-300'
          }`}
        >
          {section}
        </button>
      ))}
    </nav>
  );
};
