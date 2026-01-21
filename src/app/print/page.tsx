"use client";

import React, { useState } from "react";
import { useMenuData } from "@/hooks/useMenuData";
import { MenuData, MenuItem } from "@/types/menu";
import Image from "next/image";

type TemplateType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

// Color schemes for different templates
const getTemplateColors = (template: TemplateType) => {
  const colorSchemes: Record<TemplateType, {
    coverBg: string;
    coverTitle: string;
    coverSubtitle: string;
    coverCTA: string;
    sectionTitle: string;
    sectionBorder: string;
    categoryTitle: string;
    itemName: string;
    itemPrice: string;
    itemDescription: string;
    borderColor: string;
  }> = {
    1: {
      coverBg: "#8B1A1A",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#D4AF37",
      coverCTA: "#4CAF50",
      sectionTitle: "#2C3E50",
      sectionBorder: "#9CAF88",
      categoryTitle: "#8B1A1A",
      itemName: "#1a1a1a",
      itemPrice: "#8B1A1A",
      itemDescription: "#333333",
      borderColor: "#ccc",
    },
    2: {
      coverBg: "#1A4D8B",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#FFD700",
      coverCTA: "#FF6B6B",
      sectionTitle: "#1A4D8B",
      sectionBorder: "#4A90E2",
      categoryTitle: "#5B7FA6",
      itemName: "#1a1a1a",
      itemPrice: "#FF6B6B",
      itemDescription: "#333333",
      borderColor: "#B0C4DE",
    },
    3: {
      coverBg: "#2D5016",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#FFE135",
      coverCTA: "#FF8C00",
      sectionTitle: "#2D5016",
      sectionBorder: "#6B8E23",
      categoryTitle: "#556B2F",
      itemName: "#1a1a1a",
      itemPrice: "#FF8C00",
      itemDescription: "#333333",
      borderColor: "#9ACD32",
    },
    4: {
      coverBg: "#8B008B",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#FFD700",
      coverCTA: "#FF1493",
      sectionTitle: "#8B008B",
      sectionBorder: "#DA70D6",
      categoryTitle: "#9370DB",
      itemName: "#1a1a1a",
      itemPrice: "#FF1493",
      itemDescription: "#333333",
      borderColor: "#DDA0DD",
    },
    5: {
      coverBg: "#B8860B",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#FFFAF0",
      coverCTA: "#DC143C",
      sectionTitle: "#8B4513",
      sectionBorder: "#CD853F",
      categoryTitle: "#A0522D",
      itemName: "#1a1a1a",
      itemPrice: "#DC143C",
      itemDescription: "#333333",
      borderColor: "#DEB887",
    },
    6: {
      coverBg: "#006400",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#FFD700",
      coverCTA: "#32CD32",
      sectionTitle: "#006400",
      sectionBorder: "#90EE90",
      categoryTitle: "#228B22",
      itemName: "#1a1a1a",
      itemPrice: "#32CD32",
      itemDescription: "#333333",
      borderColor: "#98FB98",
    },
    7: {
      coverBg: "#8B0000",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#FFA500",
      coverCTA: "#FF4500",
      sectionTitle: "#8B0000",
      sectionBorder: "#CD5C5C",
      categoryTitle: "#A0522D",
      itemName: "#1a1a1a",
      itemPrice: "#FF4500",
      itemDescription: "#333333",
      borderColor: "#F08080",
    },
    8: {
      coverBg: "#191970",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#87CEEB",
      coverCTA: "#00CED1",
      sectionTitle: "#191970",
      sectionBorder: "#4682B4",
      categoryTitle: "#4169E1",
      itemName: "#1a1a1a",
      itemPrice: "#00CED1",
      itemDescription: "#333333",
      borderColor: "#B0E0E6",
    },
    9: {
      coverBg: "#1a1a1a",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#FFD700",
      coverCTA: "#FF1493",
      sectionTitle: "#9CAF88",
      sectionBorder: "#9CAF88",
      categoryTitle: "#FFFFFF",
      itemName: "#FFFFFF",
      itemPrice: "#9CAF88",
      itemDescription: "#E0E0E0",
      borderColor: "#9CAF88",
    },
    10: {
      coverBg: "#2F4F4F",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#F0E68C",
      coverCTA: "#20B2AA",
      sectionTitle: "#2F4F4F",
      sectionBorder: "#708090",
      categoryTitle: "#556B2F",
      itemName: "#1a1a1a",
      itemPrice: "#20B2AA",
      itemDescription: "#333333",
      borderColor: "#A9A9A9",
    },
    11: {
      coverBg: "#8B1A1A",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#D4AF37",
      coverCTA: "#FF69B4",
      sectionTitle: "#D4AF37",
      sectionBorder: "#D4AF37",
      categoryTitle: "#F4D03F",
      itemName: "#FFFFFF",
      itemPrice: "#F4D03F",
      itemDescription: "#E0E0E0",
      borderColor: "#D4AF37",
    },
    12: {
      coverBg: "#722F37",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#D4AF37",
      coverCTA: "#FF6347",
      sectionTitle: "#D4AF37",
      sectionBorder: "#D4AF37",
      categoryTitle: "#F4D03F",
      itemName: "#FFFFFF",
      itemPrice: "#D4AF37",
      itemDescription: "#E0E0E0",
      borderColor: "#D4AF37",
    },
    13: {
      coverBg: "#8B1A1A",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#D4AF37",
      coverCTA: "#FF4500",
      sectionTitle: "#D4AF37",
      sectionBorder: "#D4AF37",
      categoryTitle: "#F4D03F",
      itemName: "#FFFFFF",
      itemPrice: "#D4AF37",
      itemDescription: "#E0E0E0",
      borderColor: "#D4AF37",
    },
  };
  return colorSchemes[template];
};


export default function PrintMenuPage() {
  const { menuData, loading, error } = useMenuData();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(1);

  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || 'Restaurant';
  const logoPath = process.env.NEXT_PUBLIC_LOGO_PATH || '/SagarCafeLogo.jpeg';

  const handlePrint = () => {
    try {
      if (!menuData || Object.keys(menuData).length === 0) {
        alert('Menu data is not available. Please wait for the menu to load.');
        return;
      }

      // Use native browser print with CSS
      window.print();
    } catch (error) {
      console.error('Print error:', error);
      alert('An error occurred while printing. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">Loading menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Action Buttons */}
          <div className="lg:col-span-1">
            <div className="no-print bg-gradient-to-r from-[#2C3E50] to-[#34495E] shadow-2xl p-6 rounded-xl sticky top-4">
              <h2 className="text-2xl font-bold mb-6 text-white">🎨 Menu Print Templates</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-gray-200">
                  Select Template Style ({selectedTemplate}/13):
                </label>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((num) => (
                    <button
                      key={num}
                      onClick={() => setSelectedTemplate(num as TemplateType)}
                      className={`px-3 py-2 rounded-lg font-bold text-sm transition-all transform ${
                        selectedTemplate === num
                          ? "bg-gradient-to-r from-[#9CAF88] to-[#6B7C65] text-white shadow-xl scale-105 border-2 border-yellow-400"
                          : "bg-white/10 text-gray-200 hover:bg-white/20 hover:scale-102 border border-gray-400"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-4">
                <button
                  onClick={handlePrint}
                  type="button"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl font-bold text-base hover:from-green-600 hover:to-emerald-700 transition-all shadow-xl transform hover:scale-105 cursor-pointer w-full"
                >
                  🖨️ Print / Save as PDF
                </button>
              </div>
              
              <div className="text-xs text-gray-300 space-y-1">
                <p className="font-semibold">📋 Print Instructions:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2 text-xs">
                  <li>Select a template</li>
                  <li>Click "Print / Save as PDF"</li>
                  <li>In the print dialog, select "Save as PDF"</li>
                  <li>Select landscape orientation</li>
                  <li className="font-bold text-yellow-300">⚠️ IMPORTANT: Enable "Background graphics" checkbox</li>
                </ol>
                <p className="mt-2 text-green-300 text-xs">✅ Preview and Print will be the same!</p>
                <p className="mt-1 text-red-300 text-xs">⚠️ Without background graphics, colors won't show in PDF!</p>
              </div>
            </div>
          </div>

          {/* Right Side - Preview/Page */}
          <div className="lg:col-span-2">
            {/* Menu Content - Same for preview and print */}
            <div className={`print-container template-${selectedTemplate} border-4 border-[#9CAF88] rounded-xl shadow-2xl bg-white`} style={{ width: '100%', maxWidth: '100%', color: '#000' }}>
              <MenuTemplate
                menuData={menuData}
                template={selectedTemplate}
                projectName={projectName}
                logoPath={logoPath}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        /* Common Foldable Layout for All Templates - 2 Columns */
        .foldable-container {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          width: 100%;
          min-height: 100vh;
          gap: 0;
          align-items: start;
        }
        
        /* Default text colors - ensure visibility (will be overridden by inline styles) */
        .item-name {
          color: #1a1a1a !important;
          font-weight: 600 !important;
        }
        .item-price {
          color: #8B1A1A !important;
          font-weight: bold !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-end !important;
          gap: 2px !important;
        }
        
        .price-line {
          white-space: nowrap !important;
          display: block !important;
        }
        
        .price-text {
          white-space: nowrap !important;
          display: inline-block !important;
          word-break: keep-all !important;
        }
        .item-description {
          color: #444444 !important;
          font-weight: normal !important;
        }
        .section-title {
          color: #2C3E50 !important;
          font-weight: bold !important;
        }
        .category-title {
          color: #5A6C7D !important;
          font-weight: 600 !important;
        }
        
        /* Dark templates - ensure white text with good contrast */
        .template-9,
        .template-11,
        .template-12,
        .template-13 {
          background: #8B1A1A !important;
          background-color: #8B1A1A !important;
        }
        
        @media print {
          .template-9,
          .template-11,
          .template-12,
          .template-13 {
            background: #8B1A1A !important;
            background-color: #8B1A1A !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
        
        .template-9 .item-name,
        .template-11 .item-name,
        .template-12 .item-name,
        .template-13 .item-name {
          color: #FFFFFF !important;
          font-weight: 600 !important;
        }
        
        .template-9 .item-description,
        .template-11 .item-description,
        .template-12 .item-description,
        .template-13 .item-description {
          color: #E8E8E8 !important;
          font-weight: normal !important;
        }
        
        .template-9 .section-title,
        .template-11 .section-title,
        .template-12 .section-title,
        .template-13 .section-title {
          color: #D4AF37 !important;
          font-weight: bold !important;
        }
        
        .template-9 .category-title,
        .template-11 .category-title,
        .template-12 .category-title,
        .template-13 .category-title {
          color: #F4D03F !important;
          font-weight: 600 !important;
        }
        .fold-panel {
          padding: 12px 10px;
          page-break-inside: avoid;
          background: #FAFAFA;
          border-radius: 4px;
          border: 1px solid #E8E8E8;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        /* Equal spacing for all sections */
        .section {
          margin: 0;
          padding: 0;
        }
        
        .category {
          margin: 0;
          padding: 0;
        }
        
        .menu-item {
          margin-bottom: 8px;
        }
        
        .menu-item:last-child {
          margin-bottom: 0;
        }
        
        /* Screen-only card styling */
        @media screen {
          .menu-page {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border: 2px solid #D4AF37;
          }
          
          .menu-item {
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          }
          
          .menu-item:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            border-color: #D4AF37 !important;
          }
        }
        
        @media print {
          .fold-panel {
            padding: 2px 3px !important;
          }
        }
        .fold-line {
          background: repeating-linear-gradient(
            to bottom,
            #ccc 0px,
            #ccc 2px,
            transparent 2px,
            transparent 10px
          );
          width: 1px;
        }
        .cover-panel {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px 25px;
          position: relative;
          overflow: hidden;
        }
        
        /* Cover Page Styles - Applied to All Templates */
        .cover-page {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          page-break-after: always;
        }
        .cover-page::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
        }
        .cover-mandala {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          opacity: 0.2;
          z-index: 1;
        }
        .cover-content {
          position: relative;
          z-index: 2;
          padding: 40px;
        }
        .cover-logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 30px;
          opacity: 0.9;
        }
        .cover-menu-title {
          font-size: 64px;
          font-weight: bold;
          margin-bottom: 15px;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
          z-index: 2;
        }
        .cover-subtitle {
          font-size: 32px;
          font-style: italic;
          margin-bottom: 40px;
          position: relative;
          display: inline-block;
          z-index: 2;
        }
        .cover-subtitle::before,
        .cover-subtitle::after {
          content: '❋';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
        }
        .cover-subtitle::before {
          left: -40px;
        }
        .cover-subtitle::after {
          right: -40px;
        }
        .cover-cta {
          margin-top: 40px;
          padding: 15px 40px;
          background: #4CAF50;
          color: white;
          border-radius: 25px;
          font-size: 20px;
          font-weight: bold;
          display: inline-block;
          z-index: 2;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .cover-contact {
          margin-top: 20px;
          font-size: 16px;
          opacity: 0.9;
          z-index: 2;
        }
        
        /* Template-specific cover page colors */
        .cover-page.bg-gradient-to-br.from-\\[\\#D4AF37\\].to-\\[\\#F4D03F\\] .cover-subtitle::before,
        .cover-page.bg-gradient-to-br.from-\\[\\#D4AF37\\].to-\\[\\#F4D03F\\] .cover-subtitle::after {
          color: #8B6914;
        }
        .cover-page.bg-gradient-to-br.from-\\[\\#D4AF37\\].to-\\[\\#F4D03F\\] .cover-subtitle {
          color: #8B6914;
        }
        
        /* Menu Pages - Card Style */
        .menu-page {
          width: 100%;
          min-height: 100vh;
          page-break-after: always;
          padding: 20px;
          background: #FFFFFF;
          border: 2px solid #E0E0E0;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin: 10px auto;
          max-width: 100%;
        }
        .menu-page:last-child {
          page-break-after: auto;
        }
        
        @media print {
          @page {
            size: A4 landscape;
            margin: 0.5cm;
          }
          
          /* Remove all unnecessary spacing */
          * {
            box-sizing: border-box !important;
          }
          
          /* Optimize text rendering */
          body, * {
            text-rendering: optimizeLegibility !important;
            -webkit-font-smoothing: antialiased !important;
          }
          
          /* Hide non-printable elements */
          .no-print {
            display: none !important;
          }
          
          /* Force color printing - CRITICAL for PDF */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Force backgrounds and colors on all elements */
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
            background: white !important;
          }
          
          /* Reset body for print */
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            width: 100% !important;
            height: auto !important;
          }
          
          /* Cover page settings */
          .cover-page {
            page-break-after: always !important;
            page-break-inside: avoid !important;
            width: 100% !important;
            height: 100vh !important;
            min-height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            position: relative !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
            background: inherit !important;
            background-color: inherit !important;
          }
          
          .cover-page * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .cover-content {
            position: relative !important;
            z-index: 10 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            padding: 40px !important;
          }
          
          .cover-logo,
          .cover-menu-title,
          .cover-subtitle,
          .cover-cta,
          .cover-contact {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .cover-mandala {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Menu pages settings - Card Style */
          .menu-page {
            page-break-after: always !important;
            page-break-before: auto !important;
            page-break-inside: avoid !important;
            width: 100% !important;
            min-height: 100vh !important;
            padding: 25px !important;
            margin: 0 !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            background: #FFFFFF !important;
            background-color: #FFFFFF !important;
            border: 2px solid #E0E0E0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .menu-page:first-of-type {
            page-break-before: auto !important;
          }
          
          .menu-page:last-child {
            page-break-after: auto !important;
          }
          
          /* Foldable container - 2 columns */
          .foldable-container {
            grid-template-columns: 1fr 0.5px 1fr !important;
            width: 100% !important;
            max-width: 100% !important;
            min-height: auto !important;
            page-break-inside: avoid !important;
            display: grid !important;
            gap: 0 !important;
            row-gap: 0 !important;
            align-items: start !important;
          }
          
          .fold-panel {
            page-break-inside: avoid !important;
            overflow: visible !important;
            width: 100% !important;
            height: 100% !important;
            padding: 12px 10px !important;
            background: #FAFAFA !important;
            background-color: #FAFAFA !important;
            border: 1px solid #E8E8E8 !important;
            border-radius: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Equal spacing for all elements */
          .section-title {
            margin-top: 15px !important;
            margin-bottom: 10px !important;
            padding-bottom: 8px !important;
            font-size: 18px !important;
            line-height: 1.3 !important;
            font-weight: bold !important;
            border-bottom: 2px solid #D4AF37 !important;
            color: inherit !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .section-title:first-child {
            margin-top: 0 !important;
          }
          
          .category-title {
            margin-top: 10px !important;
            margin-bottom: 6px !important;
            font-size: 13px !important;
            line-height: 1.3 !important;
            font-weight: 600 !important;
            color: #8B1A1A !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .category-title:first-child {
            margin-top: 0 !important;
          }
          
          .menu-item {
            margin-bottom: 8px !important;
            padding: 10px 12px !important;
            line-height: 1.4 !important;
            background: #FFFFFF !important;
            background-color: #FFFFFF !important;
            border: 1px solid #F0F0F0 !important;
            border-radius: 4px !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            min-height: 50px !important;
            gap: 10px !important;
            width: 100% !important;
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .menu-item:last-child {
            margin-bottom: 0 !important;
          }
          
          .item-name {
            font-size: 13px !important;
            line-height: 1.4 !important;
            margin-bottom: 4px !important;
            font-weight: 600 !important;
            color: #1a1a1a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .item-price {
            font-size: 13px !important;
            line-height: 1.4 !important;
            font-weight: bold !important;
            color: #8B1A1A !important;
            flex-shrink: 0 !important;
            flex-grow: 0 !important;
            flex-basis: auto !important;
            min-width: fit-content !important;
            max-width: 150px !important;
            text-align: right !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-end !important;
            gap: 2px !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .price-line {
            white-space: nowrap !important;
            display: block !important;
            line-height: 1.3 !important;
            word-break: keep-all !important;
            overflow-wrap: normal !important;
            unicode-bidi: embed !important;
            font-variant-numeric: tabular-nums !important;
          }
          
          .price-text {
            white-space: nowrap !important;
            display: inline-block !important;
            word-break: keep-all !important;
            overflow-wrap: normal !important;
            unicode-bidi: embed !important;
          }
          
          .item-description {
            font-size: 10px !important;
            margin-top: 4px !important;
            line-height: 1.4 !important;
            display: block !important;
            padding: 0 !important;
            font-weight: normal !important;
            color: #666666 !important;
            font-style: italic !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .item-info {
            margin: 0 !important;
            padding: 0 !important;
            flex: 1 1 auto !important;
            min-width: 0 !important;
            max-width: calc(100% - 150px) !important;
            flex-shrink: 1 !important;
            overflow: hidden !important;
          }
          
          .section {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            padding: 0 !important;
          }
          
          .category {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            padding: 0 !important;
          }
          
          /* Reduce all margins and padding */
          .menu-header {
            padding: 8px 5px !important;
            margin-bottom: 5px !important;
          }
          
          .cover-content {
            padding: 15px !important;
          }
          
          /* Equal spacing - all items same margin */
          .menu-item {
            margin-bottom: 8px !important;
            padding: 10px 12px !important;
            min-height: 50px !important;
          }
          
          .menu-item:last-child {
            margin-bottom: 0 !important;
          }
          
          /* Item info layout */
          .item-info {
            margin: 0 !important;
            padding: 0 !important;
            flex: 1 !important;
            min-width: 0 !important;
          }
          
          .fold-line {
            background: repeating-linear-gradient(
              to bottom,
              #999 0px,
              #999 1px,
              transparent 1px,
              transparent 8px
            ) !important;
            width: 0.5px !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Print container */
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
          }
          
          .print-container * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Section and category breaks */
          .section {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          .category {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          .menu-item {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          /* Ensure all templates print correctly */
          .template-1,
          .template-2,
          .template-3,
          .template-4,
          .template-5,
          .template-6,
          .template-7,
          .template-8,
          .template-9,
          .template-10,
          .template-11,
          .template-12,
          .template-13 {
            width: 100% !important;
            max-width: 100% !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }

        /* Template 1: Premium Gold Elegance */
        .template-1,
        .template-1 * {
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }
        .template-1 {
          background: linear-gradient(to bottom, #FFFEF7, #FFFFFF) !important;
        }
        @media print {
          .template-1 {
            background: #FFFEF7 !important;
          }
        }
        .template-1 .menu-header {
          text-align: center;
          background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%);
          color: #1a1a1a;
          padding: 40px 30px;
          margin-bottom: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
          position: relative;
          overflow: hidden;
        }
        .template-1 .menu-header::before {
          content: '✦';
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 24px;
          opacity: 0.3;
        }
        .template-1 .menu-header::after {
          content: '✦';
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 24px;
          opacity: 0.3;
        }
        .template-1 .section-title {
          font-size: 32px;
          color: #8B6914;
          margin-top: 45px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 3px;
          border-bottom: 3px solid #D4AF37;
          padding-bottom: 12px;
          position: relative;
        }
        .template-1 .section-title::before,
        .template-1 .section-title::after {
          content: '◆';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #D4AF37;
          font-size: 16px;
        }
        .template-1 .section-title::before {
          left: -30px;
        }
        .template-1 .section-title::after {
          right: -30px;
        }
        .template-1 .category-title {
          font-size: 20px;
          color: #6B5B1A;
          margin-top: 25px;
          margin-bottom: 15px;
          font-weight: bold;
          font-style: italic;
          text-align: center;
        }
        .template-1 .menu-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding: 12px 20px;
          background: linear-gradient(to right, #FFFEF7, #FFFFFF);
          border-left: 4px solid #D4AF37;
          border-radius: 4px;
        }
        .template-1 .item-name {
          font-weight: 600;
          font-size: 16px;
          color: #2C2C2C !important;
        }
        .template-1 .item-price {
          font-weight: bold;
          font-size: 18px;
          color: #8B6914 !important;
        }
        .template-1 .item-description {
          color: #666 !important;
          font-size: 12px;
          margin-top: 4px;
        }

        /* Template 2: Modern Minimalist Luxury */
        .template-2 {
          font-family: 'Helvetica Neue', 'Arial', sans-serif;
          background: #FFFFFF;
        }
        .template-2 .menu-header {
          text-align: center;
          padding: 50px 30px;
          margin-bottom: 50px;
          background: #1a1a1a;
          color: white;
          position: relative;
        }
        .template-2 .menu-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: #9CAF88;
        }
        .template-2 .section-title {
          font-size: 28px;
          color: #1a1a1a;
          margin-top: 50px;
          margin-bottom: 25px;
          text-transform: uppercase;
          letter-spacing: 8px;
          font-weight: 300;
          text-align: center;
          position: relative;
        }
        .template-2 .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 1px;
          background: #1a1a1a;
        }
        .template-2 .category-title {
          font-size: 14px;
          color: #666;
          margin-top: 30px;
          margin-bottom: 20px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .template-2 .menu-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          padding: 15px 0;
          border-bottom: 1px solid #e5e5e5;
        }
        .template-2 .item-name {
          font-weight: 400;
          font-size: 15px;
          color: #333 !important;
          letter-spacing: 0.5px;
        }
        .template-2 .item-price {
          font-weight: 500;
          font-size: 15px;
          color: #1a1a1a !important;
        }
        .template-2 .item-description {
          color: #666 !important;
          font-size: 12px;
          margin-top: 4px;
        }

        /* Template 3: Vibrant Colorful */
        .template-3 {
          font-family: 'Verdana', 'Arial', sans-serif;
          background: #FAFAFA;
        }
        .template-3 .menu-header {
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          color: white;
          padding: 50px 30px;
          margin-bottom: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
        }
        .template-3 .section-title {
          font-size: 30px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: 40px;
          margin-bottom: 25px;
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
          position: relative;
        }
        .template-3 .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
        }
        .template-3 .category-title {
          font-size: 18px;
          color: #764ba2;
          margin-top: 25px;
          margin-bottom: 15px;
          font-weight: bold;
          background: linear-gradient(90deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          padding: 10px 20px;
          display: inline-block;
          border-radius: 8px;
          border-left: 4px solid #764ba2;
        }
        .template-3 .menu-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          padding: 15px 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          border-left: 4px solid #667eea;
        }
        .template-3 .item-name {
          font-weight: 600;
          color: #333;
          font-size: 16px;
        }
        .template-3 .item-price {
          font-weight: bold;
          color: #764ba2;
          font-size: 18px;
        }

        /* Template 4: Classic Restaurant Elegance */
        .template-4 {
          font-family: 'Times New Roman', 'Georgia', serif;
          background: #FFFBF0;
        }
        .template-4 .menu-header {
          text-align: center;
          border: 4px double #8B4513;
          padding: 40px 30px;
          margin-bottom: 45px;
          background: linear-gradient(to bottom, #FFF8E7, #FFFFFF);
          position: relative;
        }
        .template-4 .menu-header::before,
        .template-4 .menu-header::after {
          content: '';
          position: absolute;
          width: 30px;
          height: 30px;
          border: 2px solid #8B4513;
          border-radius: 50%;
        }
        .template-4 .menu-header::before {
          top: -15px;
          left: 50px;
        }
        .template-4 .menu-header::after {
          top: -15px;
          right: 50px;
        }
        .template-4 .section-title {
          font-size: 36px;
          color: #8B4513;
          margin-top: 50px;
          margin-bottom: 30px;
          text-align: center;
          text-decoration: underline;
          text-decoration-thickness: 3px;
          text-underline-offset: 10px;
          font-weight: bold;
        }
        .template-4 .category-title {
          font-size: 22px;
          color: #A0522D;
          margin-top: 30px;
          margin-bottom: 18px;
          font-style: italic;
          text-align: center;
          font-weight: 600;
        }
        .template-4 .menu-item {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
          margin-bottom: 18px;
          padding: 15px 0;
          border-bottom: 2px dotted #D2B48C;
        }
        .template-4 .item-name {
          font-weight: 600;
          font-size: 17px;
          color: #4A4A4A;
        }
        .template-4 .item-price {
          font-weight: bold;
          font-size: 17px;
          text-align: right;
          color: #8B4513;
        }

        /* Template 5: Clean Modern Professional */
        .template-5 {
          font-family: 'Helvetica', 'Arial', sans-serif;
          background: #FFFFFF;
        }
        .template-5 .menu-header {
          text-align: center;
          margin-bottom: 50px;
          padding: 40px 0;
          border-bottom: 3px solid #9CAF88;
        }
        .template-5 .section-title {
          font-size: 24px;
          color: #2C3E50;
          margin-top: 45px;
          margin-bottom: 25px;
          padding-left: 20px;
          border-left: 6px solid #9CAF88;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .template-5 .category-title {
          font-size: 16px;
          color: #5A6C7D;
          margin-top: 25px;
          margin-bottom: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .template-5 .menu-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          padding: 12px 20px;
          transition: all 0.3s;
        }
        .template-5 .menu-item:nth-child(odd) {
          background: #F8F9FA;
        }
        .template-5 .menu-item:nth-child(even) {
          background: #FFFFFF;
        }
        .template-5 .item-name {
          font-weight: 500;
          font-size: 15px;
          color: #2C3E50;
        }
        .template-5 .item-price {
          font-weight: 700;
          color: #9CAF88;
          font-size: 16px;
        }

        /* Template 6: Retro Vintage */
        .template-6 {
          font-family: 'Courier New', monospace;
          background: #F5F5DC;
        }
        .template-6 .menu-header {
          text-align: center;
          border: 5px double #2C3E50;
          padding: 50px 30px;
          margin-bottom: 50px;
          background: white;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
        }
        .template-6 .section-title {
          font-size: 28px;
          color: #2C3E50;
          margin-top: 45px;
          margin-bottom: 25px;
          text-align: center;
          border-top: 4px solid #2C3E50;
          border-bottom: 4px solid #2C3E50;
          padding: 15px 0;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 4px;
        }
        .template-6 .category-title {
          font-size: 20px;
          color: #5A6C7D;
          margin-top: 30px;
          margin-bottom: 15px;
          text-align: center;
          font-weight: bold;
          text-transform: uppercase;
        }
        .template-6 .menu-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          padding: 12px 0;
          border-bottom: 2px solid #2C3E50;
        }
        .template-6 .item-name {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 15px;
          color: #1a1a1a;
        }
        .template-6 .item-price {
          font-weight: bold;
          font-size: 16px;
          color: #2C3E50;
        }

        /* Template 7: Modern Grid Layout */
        .template-7 {
          font-family: 'Arial', sans-serif;
          background: #F0F0F0;
        }
        .template-7 .menu-header {
          text-align: center;
          background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
          color: white;
          padding: 60px 30px;
          margin-bottom: 50px;
          box-shadow: 0 10px 30px rgba(44, 62, 80, 0.3);
        }
        .template-7 .section-title {
          font-size: 28px;
          color: white;
          margin-top: 40px;
          margin-bottom: 30px;
          padding: 20px;
          background: linear-gradient(135deg, #9CAF88 0%, #6B7C65 100%);
          text-align: center;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          box-shadow: 0 4px 15px rgba(156, 175, 136, 0.4);
        }
        .template-7 .category-title {
          font-size: 20px;
          color: #9CAF88;
          margin-top: 30px;
          margin-bottom: 20px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding-left: 15px;
          border-left: 5px solid #9CAF88;
        }
        .template-7 .menu-item {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          margin-bottom: 15px;
          padding: 20px;
          background: white;
          border: 2px solid #E0E0E0;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .template-7 .item-name {
          font-weight: 600;
          font-size: 16px;
          color: #2C3E50;
        }
        .template-7 .item-price {
          font-weight: bold;
          text-align: right;
          color: #9CAF88;
          font-size: 18px;
        }

        /* Template 8: Elegant Script Style */
        .template-8 {
          font-family: 'Georgia', 'Times New Roman', serif;
          background: #FFFEF5;
        }
        .template-8 .menu-header {
          text-align: center;
          padding: 50px 30px;
          margin-bottom: 50px;
          position: relative;
          background: linear-gradient(to bottom, rgba(156, 175, 136, 0.1), transparent);
        }
        .template-8 .menu-header::before {
          content: '❋';
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 30px;
          color: #9CAF88;
          opacity: 0.3;
        }
        .template-8 .menu-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #9CAF88, transparent);
        }
        .template-8 .section-title {
          font-size: 34px;
          color: #2C3E50;
          margin-top: 50px;
          margin-bottom: 25px;
          text-align: center;
          font-style: italic;
          font-weight: 600;
          position: relative;
        }
        .template-8 .section-title::before,
        .template-8 .section-title::after {
          content: '~';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 24px;
          color: #9CAF88;
        }
        .template-8 .section-title::before {
          left: -40px;
        }
        .template-8 .section-title::after {
          right: -40px;
        }
        .template-8 .category-title {
          font-size: 22px;
          color: #5A6C7D;
          margin-top: 30px;
          margin-bottom: 18px;
          text-align: center;
          font-style: italic;
          font-weight: 500;
        }
        .template-8 .menu-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          padding: 12px 0;
        }
        .template-8 .item-name {
          font-weight: 500;
          font-size: 16px;
          color: #333;
          font-style: normal;
        }
        .template-8 .item-price {
          font-weight: 600;
          color: #2C3E50;
          font-size: 17px;
        }

        /* Template 9: Bold Contemporary */
        .template-9 {
          font-family: 'Arial Black', 'Impact', sans-serif;
          background: #1a1a1a;
          color: white;
        }
        .template-9 .menu-header {
          text-align: center;
          background: linear-gradient(135deg, #000000 0%, #2C3E50 100%);
          color: white;
          padding: 60px 30px;
          margin-bottom: 50px;
          border: 3px solid #9CAF88;
          box-shadow: 0 0 30px rgba(156, 175, 136, 0.5);
        }
        .template-9 .section-title {
          font-size: 32px;
          color: #9CAF88;
          margin-top: 50px;
          margin-bottom: 30px;
          text-transform: uppercase;
          letter-spacing: 6px;
          text-align: center;
          font-weight: 900;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .template-9 .category-title {
          font-size: 22px;
          color: #FFFFFF;
          margin-top: 35px;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-weight: 900;
          background: #2C3E50;
          padding: 10px 20px;
          display: inline-block;
        }
        .template-9 .menu-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          padding: 18px 25px;
          background: #2C3E50;
          border-left: 6px solid #9CAF88;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .template-9 .item-name {
          font-weight: bold;
          font-size: 17px;
          color: white;
        }
        .template-9 .item-price {
          font-weight: bold;
          font-size: 20px;
          color: #9CAF88;
        }

        /* Template 10: Premium Classic */
        .template-10 {
          font-family: 'Times New Roman', 'Georgia', serif;
          background: #FFFFFF;
        }
        .template-10 .menu-header {
          text-align: center;
          border-top: 6px solid #2C3E50;
          border-bottom: 6px solid #2C3E50;
          padding: 50px 30px;
          margin-bottom: 55px;
          background: linear-gradient(to bottom, #F8F8F8, #FFFFFF);
          position: relative;
        }
        .template-10 .menu-header::before,
        .template-10 .menu-header::after {
          content: '◆';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          color: #2C3E50;
        }
        .template-10 .menu-header::before {
          left: 30px;
        }
        .template-10 .menu-header::after {
          right: 30px;
        }
        .template-10 .section-title {
          font-size: 38px;
          color: #2C3E50;
          margin-top: 55px;
          margin-bottom: 35px;
          text-align: center;
          text-decoration: underline;
          text-decoration-thickness: 3px;
          text-underline-offset: 15px;
          font-weight: bold;
          letter-spacing: 2px;
        }
        .template-10 .category-title {
          font-size: 24px;
          color: #5A6C7D;
          margin-top: 40px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: bold;
          font-style: italic;
          text-decoration: underline;
          text-decoration-thickness: 1px;
        }
        .template-10 .menu-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          padding: 15px 0;
          border-bottom: 2px solid #D4D4D4;
        }
        .template-10 .item-name {
          font-weight: 600;
          font-size: 18px;
          color: #2C3E50;
        }
        .template-10 .item-price {
          font-weight: bold;
          font-size: 18px;
          color: #2C3E50;
        }

        /* Template 11: Tri-Fold Brochure Style */
        .template-11,
        .template-11 * {
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }
        .template-11 {
          background: #8B1A1A !important;
          color: white !important;
        }
        @media print {
          .template-11,
          .template-11 * {
            background: #8B1A1A !important;
            color: white !important;
          }
        }
        .template-11 .menu-header {
          text-align: center;
          background: linear-gradient(135deg, #8B1A1A 0%, #A52A2A 100%);
          color: white;
          padding: 40px 20px;
          margin-bottom: 0;
          position: relative;
          overflow: hidden;
        }
        .template-11 .menu-header::before {
          content: '✦';
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 40px;
          color: #D4AF37;
          opacity: 0.3;
          transform: rotate(45deg);
        }
        .template-11 .menu-header::after {
          content: '✦';
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 40px;
          color: #D4AF37;
          opacity: 0.3;
          transform: rotate(-45deg);
        }
        .template-11 .section-title {
          font-size: 28px;
          color: #D4AF37;
          margin-top: 35px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 3px;
          position: relative;
          padding: 15px 0;
        }
        .template-11 .section-title::before,
        .template-11 .section-title::after {
          content: '❋';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          color: #D4AF37;
        }
        .template-11 .section-title::before {
          left: -40px;
        }
        .template-11 .section-title::after {
          right: -40px;
        }
        .template-11 .category-title {
          font-size: 20px;
          color: #F4D03F;
          margin-top: 25px;
          margin-bottom: 15px;
          font-weight: bold;
          text-align: center;
          font-style: italic;
          text-decoration: underline;
          text-decoration-color: #D4AF37;
        }
        .template-11 .menu-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.05);
          border-left: 3px solid #D4AF37;
          border-radius: 4px;
        }
        .template-11 .item-name {
          font-weight: 600;
          font-size: 16px;
          color: white;
        }
        .template-11 .item-price {
          font-weight: bold;
          color: #F4D03F;
          font-size: 18px;
        }
        .template-11 .item-description {
          color: rgba(255, 255, 255, 0.8) !important;
        }

        /* Template 12: Luxury Brochure with Mandala */
        .template-12,
        .template-12 * {
          font-family: 'Georgia', 'Times New Roman', serif !important;
        }
        .template-12 {
          background: linear-gradient(135deg, #722F37 0%, #8B1A1A 100%) !important;
          color: white !important;
        }
        @media print {
          .template-12,
          .template-12 * {
            background: #722F37 !important;
            color: white !important;
          }
        }
        .template-12 .menu-header {
          text-align: center;
          background: linear-gradient(135deg, #8B1A1A 0%, #722F37 100%);
          color: white;
          padding: 50px 30px;
          margin-bottom: 0;
          position: relative;
          border-bottom: 3px solid #D4AF37;
        }
        .template-12 .menu-header::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 10px;
          width: 100px;
          height: 100px;
          border: 3px solid #D4AF37;
          border-radius: 50%;
          opacity: 0.2;
        }
        .template-12 .menu-header::after {
          content: '';
          position: absolute;
          top: 10px;
          right: 10px;
          width: 100px;
          height: 100px;
          border: 3px solid #D4AF37;
          border-radius: 50%;
          opacity: 0.2;
        }
        .template-12 .section-title {
          font-size: 32px;
          color: #D4AF37;
          margin-top: 40px;
          margin-bottom: 25px;
          text-align: center;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 4px;
          position: relative;
          padding: 20px 0;
          border-top: 2px solid #D4AF37;
          border-bottom: 2px solid #D4AF37;
        }
        .template-12 .section-title::before {
          content: '◆';
          position: absolute;
          top: 50%;
          left: -50px;
          transform: translateY(-50%);
          font-size: 24px;
          color: #D4AF37;
        }
        .template-12 .section-title::after {
          content: '◆';
          position: absolute;
          top: 50%;
          right: -50px;
          transform: translateY(-50%);
          font-size: 24px;
          color: #D4AF37;
        }
        .template-12 .category-title {
          font-size: 22px;
          color: #F4D03F;
          margin-top: 30px;
          margin-bottom: 18px;
          font-weight: bold;
          text-align: center;
          font-style: italic;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .template-12 .menu-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          padding: 15px 25px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .template-12 .item-name {
          font-weight: 600;
          font-size: 17px;
          color: white;
        }
        .template-12 .item-price {
          font-weight: bold;
          color: #D4AF37;
          font-size: 19px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        .template-12 .item-description {
          color: rgba(255, 255, 255, 0.85) !important;
        }

        /* Template 13: Foldable Menu Card (Tri-Fold) */
        .template-13 {
          font-family: 'Georgia', 'Times New Roman', serif;
          background: #FFFFFF;
        }
        .template-13 .foldable-container {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          min-height: 100vh;
          width: 100%;
        }
        .template-13 .fold-panel {
          padding: 20px 15px;
          page-break-inside: avoid;
        }
        .template-13 .fold-line {
          background: repeating-linear-gradient(
            to bottom,
            #ccc 0px,
            #ccc 2px,
            transparent 2px,
            transparent 10px
          );
          width: 1px;
        }
        .template-13 .menu-header {
          text-align: center;
          padding: 30px 20px;
          margin-bottom: 25px;
          background: linear-gradient(135deg, #8B1A1A 0%, #A52A2A 100%);
          color: white;
          border-radius: 8px;
          position: relative;
        }
        .template-13 .menu-header::before {
          content: '✦';
          position: absolute;
          top: 15px;
          left: 15px;
          font-size: 30px;
          color: #D4AF37;
          opacity: 0.3;
        }
        .template-13 .menu-header::after {
          content: '✦';
          position: absolute;
          top: 15px;
          right: 15px;
          font-size: 30px;
          color: #D4AF37;
          opacity: 0.3;
        }
        .template-13 .section-title {
          font-size: 22px;
          color: #8B1A1A;
          margin-top: 25px;
          margin-bottom: 15px;
          text-align: center;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          border-bottom: 2px solid #D4AF37;
          padding-bottom: 8px;
        }
        .template-13 .category-title {
          font-size: 16px;
          color: #A52A2A;
          margin-top: 18px;
          margin-bottom: 10px;
          font-weight: bold;
          text-align: center;
          font-style: italic;
        }
        .template-13 .menu-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          padding: 8px 10px;
          background: #FFF8F0;
          border-left: 3px solid #D4AF37;
          border-radius: 3px;
        }
        .template-13 .item-name {
          font-weight: 600;
          font-size: 14px;
          color: #2C2C2C;
        }
        .template-13 .item-price {
          font-weight: bold;
          color: #8B1A1A;
          font-size: 15px;
        }
        .template-13 .item-description {
          font-size: 11px;
          color: #666;
          margin-top: 3px;
          font-style: italic;
        }
        .template-13 .cover-panel {
          background: linear-gradient(135deg, #8B1A1A 0%, #722F37 100%);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px 25px;
          position: relative;
          overflow: hidden;
        }
        .template-13 .cover-panel::before {
          content: '';
          position: absolute;
          top: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          border: 3px solid #D4AF37;
          border-radius: 50%;
          opacity: 0.2;
        }
        .template-13 .cover-panel::after {
          content: '';
          position: absolute;
          bottom: -50px;
          left: -50px;
          width: 200px;
          height: 200px;
          border: 3px solid #D4AF37;
          border-radius: 50%;
          opacity: 0.2;
        }
        .template-13 .cover-title {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 15px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          z-index: 1;
        }
        .template-13 .cover-subtitle {
          font-size: 18px;
          font-style: italic;
          color: #F4D03F;
          z-index: 1;
        }
        .template-13 .contact-info {
          margin-top: 30px;
          font-size: 12px;
          opacity: 0.9;
          z-index: 1;
        }
        @media print {
          .template-13 .fold-line {
            background: repeating-linear-gradient(
              to bottom,
              #999 0px,
              #999 1px,
              transparent 1px,
              transparent 8px
            );
          }
          .template-13 .foldable-container {
            grid-template-columns: 1fr 0.5px 1fr;
          }
        }
      `}</style>
    </div>
  );
}

function MenuTemplate({
  menuData,
  template,
  projectName,
  logoPath,
}: {
  menuData: MenuData;
  template: TemplateType;
  projectName: string;
  logoPath: string;
}) {
  const colors = getTemplateColors(template);
  
  const formatPrice = (item: MenuItem): string[] => {
    const priceMap: { [key: string]: number } = {};
    
    // Collect valid prices
    if (item.priceSmall && typeof item.priceSmall === 'number' && item.priceSmall > 0) {
      priceMap['S'] = item.priceSmall;
    }
    if (item.priceRegular && typeof item.priceRegular === 'number' && item.priceRegular > 0) {
      priceMap['R'] = item.priceRegular;
    }
    if (item.priceMedium && typeof item.priceMedium === 'number' && item.priceMedium > 0) {
      priceMap['M'] = item.priceMedium;
    }
    if (item.priceLarge && typeof item.priceLarge === 'number' && item.priceLarge > 0) {
      priceMap['L'] = item.priceLarge;
    }
    
    // If no valid prices found
    if (Object.keys(priceMap).length === 0) {
      return ["N/A"];
    }
    
    // If only one price exists, show without prefix
    if (Object.keys(priceMap).length === 1) {
      const price = Object.values(priceMap)[0];
      return [`₹\u00A0${price}`];
    }
    
    // Check if all prices are the same
    const uniquePrices = new Set(Object.values(priceMap));
    if (uniquePrices.size === 1) {
      // All prices are same, show just once
      const price = Object.values(priceMap)[0];
      return [`₹\u00A0${price}`];
    }
    
    // Multiple different prices: return as array for vertical display
    // Use non-breaking space after rupee symbol to prevent breaking
    const formattedPrices: string[] = [];
    if (priceMap['S']) formattedPrices.push(`S: ₹\u00A0${priceMap['S']}`);
    if (priceMap['M']) formattedPrices.push(`M: ₹\u00A0${priceMap['M']}`);
    if (priceMap['R']) formattedPrices.push(`R: ₹\u00A0${priceMap['R']}`);
    if (priceMap['L']) formattedPrices.push(`L: ₹\u00A0${priceMap['L']}`);
    
    return formattedPrices;
  };

  const isDarkTemplate = template === 11 || template === 12;
  
  // Calculate items per page for pagination
  const calculateItemsPerPage = () => {
    // Professional menu card: balanced spacing for readability
    return 25;
  };
  
  // Create cover page component
  const CoverPage = () => {
    const isDarkCover = template === 2 || template === 7 || template === 9 || template >= 11;
    
    return (
      <div className="cover-page" style={{ backgroundColor: colors.coverBg, color: colors.coverTitle }}>
        {/* Mandala Pattern Background */}
        <div className="cover-mandala">
          <svg width="300" height="300" viewBox="0 0 200 200" style={{ opacity: 0.15 }}>
            <circle cx="100" cy="100" r="80" fill="none" stroke={colors.coverSubtitle} strokeWidth="2"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke={colors.coverSubtitle} strokeWidth="1.5"/>
            <circle cx="100" cy="100" r="40" fill="none" stroke={colors.coverSubtitle} strokeWidth="1"/>
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              const x1 = 100 + 70 * Math.cos(angle);
              const y1 = 100 + 70 * Math.sin(angle);
              const x2 = 100 + 50 * Math.cos(angle);
              const y2 = 100 + 50 * Math.sin(angle);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.coverSubtitle} strokeWidth="1.5"/>
              );
            })}
          </svg>
        </div>
        
        <div className="cover-content">
          {/* Logo */}
          <div className="cover-logo">
            <Image
              src={logoPath}
              alt={projectName}
              width={100}
              height={100}
              className="rounded-full mx-auto border-4 border-[#D4AF37] shadow-xl"
            />
          </div>
          
          {/* Menu Title */}
          <div className="cover-menu-title" style={{ color: colors.coverTitle }}>MENU</div>
          
          {/* Subtitle with decorative elements */}
          <div className="cover-subtitle" style={{ color: colors.coverSubtitle }}>
            {new Date().toLocaleDateString('en-IN', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </div>
          
          {/* Restaurant Name */}
          <div className="text-3xl font-bold mt-8" style={{ color: colors.coverTitle }}>
            {projectName}
          </div>
          
          {/* CTA Button */}
          <div className="cover-cta" style={{ backgroundColor: colors.coverCTA, color: '#FFFFFF' }}>Order Now</div>
          
          {/* Contact Info */}
          <div className="cover-contact" style={{ color: colors.coverTitle }}>
            Authentic Flavors • Fresh Ingredients
          </div>
        </div>
      </div>
    );
  };
  
  // All templates now use foldable layout with cover page
  // Each section gets its own page
  {
    const sections = Object.keys(menuData);
    const totalPages = sections.length;
    
    return (
      <>
        {/* Cover Page */}
        <CoverPage />
        
        {/* Menu Pages - One page per section */}
        {sections.map((sectionName, pageIndex) => {
          // Get all categories for this section
          const sectionData = menuData[sectionName];
          const categories = Object.keys(sectionData);
          
          // Distribute categories across 2 panels
          const categoriesPerPanel = Math.ceil(categories.length / 2);
          const panel1Categories = categories.slice(0, categoriesPerPanel);
          const panel2Categories = categories.slice(categoriesPerPanel);
          
          return (
            <div key={pageIndex} className={`menu-page template-${template}`} style={{ pageBreakBefore: pageIndex === 0 ? 'auto' : 'always' }}>
              <div className="foldable-container">
                {/* Left Panel */}
                <div className="fold-panel">
                  <div className="section">
                    <h2 className="section-title" style={{ color: colors.sectionTitle, borderBottomColor: colors.sectionBorder }}>{sectionName}</h2>
                    {panel1Categories.map((category) => (
                      <div key={category} className="category">
                        <h3 className="category-title" style={{ color: colors.categoryTitle }}>{category}</h3>
                        {sectionData[category].map((item, index) => (
                          <div key={index} className="menu-item">
                            <div className="item-info">
                              <div className="item-name" style={{ color: colors.itemName }}>{item.itemName}</div>
                              {item.description && (
                                <div className="item-description" style={{ color: colors.itemDescription }}>{item.description}</div>
                              )}
                            </div>
                            <div className="item-price" style={{ color: colors.itemPrice }}>
                              {formatPrice(item).map((price, idx) => (
                                <div key={idx} className="price-line">
                                  <span className="price-text">{price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Fold Line */}
                <div className="fold-line"></div>
                
                {/* Right Panel */}
                <div className="fold-panel">
                  <div className="section">
                    {panel2Categories.map((category) => (
                      <div key={category} className="category">
                        <h3 className="category-title" style={{ color: colors.categoryTitle }}>{category}</h3>
                        {sectionData[category].map((item, index) => (
                          <div key={index} className="menu-item">
                            <div className="item-info">
                              <div className="item-name" style={{ color: colors.itemName }}>{item.itemName}</div>
                              {item.description && (
                                <div className="item-description" style={{ color: colors.itemDescription }}>{item.description}</div>
                              )}
                            </div>
                            <div className="item-price" style={{ color: colors.itemPrice }}>
                              {formatPrice(item).map((price, idx) => (
                                <div key={idx} className="price-line">
                                  <span className="price-text">{price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  
                  {/* Page Number */}
                  <div className="text-center mt-8 text-sm opacity-60">
                    Page {pageIndex + 1} of {totalPages}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  
  // Fallback - should not reach here
  return null;
}
