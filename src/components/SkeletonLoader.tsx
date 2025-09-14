"use client";

import React from "react";

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#E8E6D9] to-[#9CAF88] relative">
      {/* Header Skeleton */}
      <header className="bg-white/80 backdrop-blur-md p-2 md:p-6 text-center shadow-lg border-b border-[#D4D7C7] sticky top-0 z-20">
        <div className="flex items-center justify-center gap-1 md:gap-2">
          <div className="md:w-20 md:h-20 w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="h-8 md:h-12 w-48 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="h-4 md:h-6 w-80 bg-gray-300 rounded animate-pulse mx-auto mt-2"></div>
      </header>

      <div className="container mx-auto max-w-6xl md:p-4 p-2 relative z-10">
        {/* Search Bar Skeleton */}
        <div className="mb-6">
          <div className="h-12 w-full bg-gray-300 rounded-lg animate-pulse"></div>
        </div>

        {/* Navigation Skeleton */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-300 rounded-full animate-pulse flex-shrink-0"></div>
            ))}
          </div>
        </div>

        {/* Menu Items Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3].map((section) => (
            <div key={section} className="space-y-4">
              <div className="h-8 w-48 bg-gray-300 rounded animate-pulse"></div>
              <div className="grid gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse mb-2"></div>
                        <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-2"></div>
                        <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                      <div className="h-6 w-16 bg-gray-300 rounded animate-pulse ml-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
