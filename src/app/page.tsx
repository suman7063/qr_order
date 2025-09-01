import React from "react";
import { RestaurantMenuClient } from "@/components/RestaurantMenuClient";
import { ClientOnly } from "@/components/ClientOnly";

export default function RestaurantMenu() {
  return (
    <ClientOnly 
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#E8E6D9] to-[#9CAF88] flex items-center justify-center">
          <div className="text-[#2C3E50] text-xl font-medium">
            Loading menu...
          </div>
        </div>
      }
    >
      <RestaurantMenuClient />
    </ClientOnly>
  );
}
