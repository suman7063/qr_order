"use client";

import React, { useState } from "react";
import { RefreshCw, Home, Settings, Database, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useClickTracking } from "@/hooks/useClickTracking";
import Image from "next/image";

export default function AdminPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const { handleClick } = useClickTracking();
  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || "Restaurant";
  const logoPath = process.env.NEXT_PUBLIC_LOGO_PATH || "/SagarCafeLogo.png";

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setMessage(null);

      handleClick("admin_cache_refresh_clicked", {
        timestamp: new Date().toISOString(),
      });

      const response = await fetch("/api/menu/refresh", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: "success",
          text: "Cache cleared successfully! Menu data has been refreshed from Google Sheet.",
        });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to refresh cache. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error refreshing cache:", error);
      setMessage({
        type: "error",
        text: "Error refreshing cache. Please check your connection and try again.",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#E8E6D9] to-[#9CAF88]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md p-4 md:p-6 shadow-lg border-b border-[#D4D7C7]">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={logoPath}
              alt={projectName}
              width={60}
              height={60}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-[#2C3E50]">
                Admin Panel
              </h1>
              <p className="text-sm text-[#5A6C7D]">Menu Management</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-[#2C3E50] text-white rounded-lg hover:bg-[#34495E] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="hidden md:inline">Back to Menu</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl p-4 md:p-8">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-[#D4D7C7] p-6 md:p-8">
          {/* Page Title */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#E8E6D9] rounded-full">
              <Settings className="w-6 h-6 text-[#6B7C65]" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E50]">
                Cache Management
              </h2>
              <p className="text-sm text-[#5A6C7D] mt-1">
                Manage menu data cache and refresh from Google Sheet
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-[#E8E6D9]/50 rounded-lg p-6 mb-6 border border-[#D4D7C7]">
            <div className="flex items-start gap-4">
              <Database className="w-6 h-6 text-[#6B7C65] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#2C3E50] mb-2">
                  How Cache Works
                </h3>
                <ul className="text-sm text-[#5A6C7D] space-y-2">
                  <li>• Menu data is cached for <strong>30 minutes</strong> for better performance</li>
                  <li>• After updating Google Sheet, use the refresh button below to get fresh data</li>
                  <li>• Cache helps reduce server load and improves page load speed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Refresh Button Section */}
          <div className="bg-gradient-to-r from-[#E8E6D9] to-[#F5F5DC] rounded-lg p-6 md:p-8 border border-[#D4D7C7]">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">
                Refresh Menu Cache
              </h3>
              <p className="text-sm text-[#5A6C7D] mb-6">
                Click the button below to clear cache and fetch fresh data from Google Sheet
              </p>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#2C3E50] hover:bg-[#34495E] disabled:bg-[#7F8C8D] text-white rounded-lg shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:ring-opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isRefreshing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Refreshing...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    <span>Refresh Cache Now</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-lg border ${
                message.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              } animate-slide-up`}
            >
              <div className="flex items-start gap-3">
                {message.type === "success" ? (
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm font-medium">{message.text}</p>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-[#D4D7C7]">
            <h4 className="font-semibold text-[#2C3E50] mb-3">Quick Links</h4>
            <div className="flex flex-wrap gap-4">
              <a
                href="/api/menu/refresh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#6B7C65] hover:text-[#2C3E50] underline"
              >
                Direct API Endpoint
              </a>
              <Link
                href="/"
                className="text-sm text-[#6B7C65] hover:text-[#2C3E50] underline"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

