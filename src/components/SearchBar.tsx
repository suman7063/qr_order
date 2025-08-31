'use client';

import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="text-center mb-4">
      <div className="relative md:inline-block">
        <input
          type="text"
          placeholder="🔍 Search menu items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-96 max-w-full px-6 py-3 md:py-4 border-2 border-[#D4D7C7] rounded-full text-lg bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:border-[#6B7C65] focus:shadow-lg focus:shadow-[#6B7C65]/20 text-[#2C3E50] placeholder-[#8A9BA8]"
        />
      </div>
    </div>
  );
};
