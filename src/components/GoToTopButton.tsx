"use client";

import React, { useState, useEffect } from "react";
import { useClickTracking } from "@/hooks/useClickTracking";

export const GoToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { handleClick } = useClickTracking();

  // Show button when user scrolls down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    handleClick("go_to_top_clicked", {
      scrollPosition: window.pageYOffset,
      timestamp: new Date().toISOString(),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-[#2C3E50] hover:bg-[#34495E] text-white p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:ring-opacity-50"
      aria-label="Go to top"
      title="Go to top"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};
