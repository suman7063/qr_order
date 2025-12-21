"use client";

import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useClickTracking } from "@/hooks/useClickTracking";

export const CacheRefreshButton: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const { handleClick } = useClickTracking();

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setShowMessage(false);

      handleClick("cache_refresh_clicked", {
        timestamp: new Date().toISOString(),
      });

      const response = await fetch("/api/menu/refresh", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ Cache cleared! Menu updated successfully.");
        setShowMessage(true);
        
        // Reload the page after 1 second to show fresh data
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage("❌ Failed to refresh cache. Please try again.");
        setShowMessage(true);
      }
    } catch (error) {
      console.error("Error refreshing cache:", error);
      setMessage("❌ Error refreshing cache. Please try again.");
      setShowMessage(true);
    } finally {
      setIsRefreshing(false);
      // Hide message after 3 seconds
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  return (
    <>
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="fixed bottom-6 left-6 z-50 bg-[#2C3E50] hover:bg-[#34495E] disabled:bg-[#7F8C8D] text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:ring-opacity-50 disabled:cursor-not-allowed"
        aria-label="Refresh menu cache"
        title="Refresh menu from Google Sheet"
      >
        <RefreshCw
          className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
        />
      </button>

      {/* Success/Error Message */}
      {showMessage && (
        <div className="fixed bottom-20 left-6 z-50 bg-white/95 backdrop-blur-md p-4 rounded-lg shadow-xl border border-[#D4D7C7] max-w-xs animate-slide-up">
          <p className="text-sm text-[#2C3E50] font-medium">{message}</p>
        </div>
      )}
    </>
  );
};

