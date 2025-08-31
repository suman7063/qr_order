'use client';

import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="text-center mb-8">
      <div className="relative inline-block">
        <input
          type="text"
          placeholder="🔍 Search menu items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-80 max-w-full px-6 py-4 border-2 border-gray-300 rounded-full text-lg bg-white bg-opacity-90 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:border-orange-500 focus:shadow-xl focus:shadow-orange-200"
        />
      </div>
    </div>
  );
};
