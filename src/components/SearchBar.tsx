'use client';

import React from 'react';
import { useClickTracking } from '@/hooks/useClickTracking';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const { handleClick } = useClickTracking();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    if (newQuery !== searchQuery) {
      handleClick('search_input', { 
        query: newQuery, 
        previousQuery: searchQuery,
        queryLength: newQuery.length,
        isClearing: newQuery.length === 0,
        hasResults: newQuery.length > 0
      });
    }
    setSearchQuery(newQuery);
  };

  const handleSearchFocus = () => {
    handleClick('search_focus', { 
      currentQuery: searchQuery,
      hasExistingQuery: searchQuery.length > 0
    });
  };

  const handleSearchBlur = () => {
    handleClick('search_blur', { 
      finalQuery: searchQuery,
      queryLength: searchQuery.length
    });
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick('search_submit', { 
        query: searchQuery,
        queryLength: searchQuery.length,
        method: 'enter_key'
      });
    }
  };

  return (
    <div className="text-center md:mb-4 mb-2">
      <div className="relative md:inline-block">
        <input
          type="text"
          placeholder="🔍 Search menu items..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          onKeyPress={handleSearchKeyPress}
          className="w-full md:w-96 max-w-full px-6 py-2 md:py-4 border-2 border-[#D4D7C7] rounded-full text-lg bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:border-[#6B7C65] focus:shadow-lg focus:shadow-[#6B7C65]/20 text-[#2C3E50] placeholder-[#8A9BA8]"
        />
      </div>
    </div>
  );
};
