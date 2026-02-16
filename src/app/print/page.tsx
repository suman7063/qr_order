"use client";

import React, { useState, useRef } from "react";
import { useMenuData } from "@/hooks/useMenuData";
import { MenuData, MenuItem } from "@/types/menu";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type TemplateType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

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
    14: {
      coverBg: "#9CAF88",
      coverTitle: "#FFFFFF",
      coverSubtitle: "#F5F5DC",
      coverCTA: "#6B8E23",
      sectionTitle: "#6B7C65",
      sectionBorder: "#9CAF88",
      categoryTitle: "#6B8E23",
      itemName: "#2C3E50",
      itemPrice: "#6B8E23",
      itemDescription: "#5A6C7D",
      borderColor: "#9CAF88",
    },
  };
  return colorSchemes[template];
};


export default function PrintMenuPage() {
  const { menuData, loading, error } = useMenuData();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || 'Restaurant';
  const logoPath = process.env.NEXT_PUBLIC_LOGO_PATH || '/SagarCafeLogo.png';

  const handlePrint = async () => {
    try {
      if (!menuData || Object.keys(menuData).length === 0) {
        alert('Menu data is not available. Please wait for the menu to load.');
        return;
      }

      if (!menuContainerRef.current) {
        alert('Menu container not found. Please try again.');
        return;
      }

      setIsGeneratingPDF(true);

      // Wait a bit for any animations/rendering to complete
      await new Promise(resolve => setTimeout(resolve, 500));

      // Add temporary stylesheet to ensure content is visible during capture
      const styleSheet = document.createElement('style');
      styleSheet.id = 'temp-capture-styles';
      styleSheet.textContent = `
        .no-print { display: none !important; }
        * { 
          visibility: visible !important; 
          opacity: 1 !important;
        }
        .menu-page, .cover-page {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        .menu-page *, .cover-page * {
          visibility: visible !important;
          opacity: 1 !important;
        }
      `;
      document.head.appendChild(styleSheet);

      // Get container width to ensure all pages have same width
      const containerWidth = menuContainerRef.current.offsetWidth || menuContainerRef.current.clientWidth;
      
      // Capture each page separately
      const menuPages = menuContainerRef.current.querySelectorAll('.menu-page, .cover-page');
      
      // Find the maximum width to ensure all pages use the same width
      let maxPageWidth = containerWidth || 1200;
      menuPages.forEach((page) => {
        const pageEl = page as HTMLElement;
        const pageWidth = pageEl.offsetWidth || pageEl.scrollWidth || containerWidth;
        maxPageWidth = Math.max(maxPageWidth, pageWidth);
      });
      
      // Use the maximum width for ALL pages to ensure consistency
      const fixedPageWidth = maxPageWidth;
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = 297; // A4 width in mm (landscape)
      const pdfHeight = 210; // A4 height in mm (landscape)

      for (let i = 0; i < menuPages.length; i++) {
        const page = menuPages[i] as HTMLElement;
        
        // Check if page has content
        if (!page || page.offsetHeight === 0) {
          console.warn(`Page ${i} has no content, skipping...`);
          continue;
        }
        
        // Save original styles
        const originalStyles = {
          position: page.style.position,
          zIndex: page.style.zIndex,
          display: page.style.display,
          visibility: page.style.visibility,
          opacity: page.style.opacity,
          height: page.style.height,
          maxHeight: page.style.maxHeight,
          overflow: page.style.overflow,
          overflowY: page.style.overflowY,
        };
        
        // Hide all other pages temporarily to isolate this one
        menuPages.forEach((otherPage: Element, idx: number) => {
          if (idx !== i) {
            const other = otherPage as HTMLElement;
            other.style.display = 'none';
            other.style.visibility = 'hidden';
            other.style.opacity = '0';
          }
        });
        
        // Make current page visible and ensure it's rendered
        // CRITICAL: Set these styles explicitly to ensure visibility
        page.style.position = 'relative';
        page.style.zIndex = '9999';
        page.style.display = 'block';
        page.style.visibility = 'visible';
        page.style.opacity = '1';
        page.style.width = `${fixedPageWidth}px`;
        page.style.maxWidth = `${fixedPageWidth}px`;
        page.style.minWidth = `${fixedPageWidth}px`;
        page.style.overflow = 'visible';
        page.style.overflowY = 'visible';
        page.style.height = 'auto';
        page.style.minHeight = 'auto';
        page.style.maxHeight = 'none';
        page.style.padding = '';
        page.style.margin = '';
        
        // Force the page to be in the document flow
        page.removeAttribute('hidden');
        page.setAttribute('aria-hidden', 'false');
        
        // Ensure all child containers don't restrict height
        const foldableContainers = page.querySelectorAll('.foldable-container');
        foldableContainers.forEach((container: Element) => {
          const cont = container as HTMLElement;
          cont.style.height = 'auto';
          cont.style.minHeight = 'auto';
          cont.style.maxHeight = 'none';
          cont.style.overflow = 'visible';
          cont.style.overflowY = 'visible';
        });
        
        const foldPanels = page.querySelectorAll('.fold-panel');
        foldPanels.forEach((panel: Element) => {
          const pan = panel as HTMLElement;
          pan.style.height = 'auto';
          pan.style.minHeight = 'auto';
          pan.style.maxHeight = 'none';
          pan.style.overflow = 'visible';
          pan.style.overflowY = 'visible';
        });
        
        // Ensure sections expand naturally
        const sections = page.querySelectorAll('.section');
        sections.forEach((section: Element) => {
          const sec = section as HTMLElement;
          sec.style.height = 'auto';
          sec.style.minHeight = 'auto';
          sec.style.maxHeight = 'none';
          sec.style.overflow = 'visible';
          sec.style.overflowY = 'visible';
        });
        
        // Verify page has content before proceeding
        // Check for both cover page and menu page elements
        const isCoverPage = page.classList.contains('cover-page');
        const hasMenuContent = page.querySelector('.section-title, .category-title, .menu-item, .foldable-container');
        const hasCoverContent = page.querySelector('.cover-content, .cover-title, .cover-logo');
        const hasContent = hasMenuContent || hasCoverContent;
        
        if (!hasContent) {
          console.error(`Page ${i} has no content elements! Class: ${page.className}, HTML: ${page.innerHTML.substring(0, 200)}`);
          Object.assign(page.style, originalStyles);
          // Restore other pages
          menuPages.forEach((otherPage: Element, idx: number) => {
            if (idx !== i) {
              const other = otherPage as HTMLElement;
              other.style.display = '';
              other.style.visibility = '';
              other.style.opacity = '';
            }
          });
          continue;
        }
        
        if (isCoverPage) {
          console.log(`Page ${i} is cover page - Found cover content elements`);
        } else {
          console.log(`Page ${i} content check: Found ${page.querySelectorAll('.menu-item').length} menu items, ${page.querySelectorAll('.category').length} categories`);
        }
        
        // Ensure page is in viewport and visible
        const container = menuContainerRef.current;
        if (container) {
          // Make container visible and position it
          container.style.display = 'block';
          container.style.visibility = 'visible';
          container.style.opacity = '1';
          container.style.position = 'relative';
          container.style.overflow = 'visible';
          container.style.height = 'auto';
          container.style.maxHeight = 'none';
          // Scroll container to show this page
          container.scrollTop = page.offsetTop;
        }
        
        // Position page at top of viewport for better capture
        page.style.position = 'relative';
        page.style.top = '0';
        page.style.left = '0';
        page.style.marginTop = '0';
        page.style.marginBottom = '0';
        
        // Ensure page is visible in DOM and scroll to it
        page.scrollIntoView({ behavior: 'instant', block: 'start' });
        
        // Scroll window to top to ensure page starts at viewport top
        window.scrollTo(0, 0);
        
        // Wait for rendering and fonts - longer wait for content to load
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Force multiple reflows to ensure rendering
        void page.offsetHeight;
        void page.offsetWidth;
        void page.getBoundingClientRect();
        
        // Check if text content exists and verify rendering
        const textContent = page.textContent || page.innerText;
        if (!textContent || textContent.trim().length === 0) {
          console.warn(`Page ${i} has no text content! HTML:`, page.innerHTML.substring(0, 200));
        } else {
          console.log(`Page ${i} has text content: ${textContent.substring(0, 100)}...`);
        }
        
        // Verify elements are actually rendered
        const testElement = page.querySelector('.section-title, .category-title, .item-name');
        if (testElement) {
          const testRect = testElement.getBoundingClientRect();
          if (testRect.width === 0 || testRect.height === 0) {
            console.warn(`Page ${i} test element not rendered properly!`);
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get actual dimensions from the rendered page
        const rect = page.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(page);
        
        // Check if page is actually visible
        if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden' || computedStyle.opacity === '0') {
          console.error(`Page ${i} is not visible!`);
          Object.assign(page.style, originalStyles);
          // Restore other pages
          menuPages.forEach((otherPage: Element, idx: number) => {
            if (idx !== i) {
              const other = otherPage as HTMLElement;
              other.style.display = '';
              other.style.visibility = '';
            }
          });
          continue;
        }
        
        // Calculate width - ALWAYS use fixedPageWidth for consistency across all pages
        const pageWidth = fixedPageWidth; // Always same width for all pages
        
        console.log(`Preparing to capture page ${i}: width=${pageWidth}, initial scrollHeight=${page.scrollHeight}, offsetHeight=${page.offsetHeight}`);
        
        // Wait for fonts to load before capture
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Ensure all text elements are visible and have proper styles
        const textElements = page.querySelectorAll('h1, h2, h3, p, span, div, li');
        textElements.forEach((el: Element) => {
          const element = el as HTMLElement;
          const style = window.getComputedStyle(element);
          if (style.color === 'rgba(0, 0, 0, 0)' || style.color === 'transparent') {
            element.style.color = '#000000';
          }
          if (style.fontSize === '0px') {
            element.style.fontSize = 'inherit';
          }
        });
        
        // Let page expand naturally - don't restrict height
        // This ensures all content is visible for capture
        page.style.height = 'auto';
        page.style.minHeight = 'auto';
        page.style.maxHeight = 'none';
        
        // Also ensure foldable container expands naturally
        let foldableContainer = page.querySelector('.foldable-container') as HTMLElement;
        if (foldableContainer) {
          foldableContainer.style.height = 'auto';
          foldableContainer.style.minHeight = 'auto';
          foldableContainer.style.maxHeight = 'none';
        }
        
        // Wait for layout to settle and content to render
        await new Promise(resolve => setTimeout(resolve, 500));
        void page.offsetHeight; // Force reflow
        void page.scrollHeight; // Force calculation
        await new Promise(resolve => setTimeout(resolve, 300));
        void page.offsetHeight; // Force reflow again
        void page.scrollHeight; // Force calculation again
        
        // Get the actual rendered height after natural expansion
        const actualRenderedHeight = Math.max(
          page.scrollHeight,
          page.offsetHeight,
          page.getBoundingClientRect().height
        );
        
        console.log(`Page ${i} natural height: scrollHeight=${page.scrollHeight}, offsetHeight=${page.offsetHeight}, rect.height=${page.getBoundingClientRect().height}`);
        
        // Final wait to ensure all content is fully rendered before capture
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Re-check height after final wait
        const finalHeight = Math.max(
          page.scrollHeight,
          page.offsetHeight,
          page.getBoundingClientRect().height
        );
        console.log(`Page ${i} final height before capture: ${finalHeight}px`);
        
        // Final verification: Ensure page is visible and has dimensions
        const finalRect = page.getBoundingClientRect();
        const finalComputedStyle = window.getComputedStyle(page);
        
        console.log(`Page ${i} before capture:`, {
          display: finalComputedStyle.display,
          visibility: finalComputedStyle.visibility,
          opacity: finalComputedStyle.opacity,
          width: finalRect.width,
          height: finalRect.height,
          scrollHeight: page.scrollHeight,
          offsetHeight: page.offsetHeight,
          hasContent: page.querySelectorAll('.menu-item').length > 0
        });
        
        if (finalComputedStyle.display === 'none' || finalComputedStyle.visibility === 'hidden' || finalRect.width === 0) {
          console.error(`Page ${i} is not properly visible! Skipping capture.`);
          Object.assign(page.style, originalStyles);
          // Restore other pages
          menuPages.forEach((otherPage: Element, idx: number) => {
            if (idx !== i) {
              const other = otherPage as HTMLElement;
              other.style.display = '';
              other.style.visibility = '';
              other.style.opacity = '';
            }
          });
          continue;
        }
        
        // Calculate full content height by checking ALL child elements
        // Reuse foldableContainer variable
        if (!foldableContainer) {
          foldableContainer = page.querySelector('.foldable-container') as HTMLElement;
        }
        
        // Get height of all major content elements
        let maxBottom = 0;
        const allContentElements = page.querySelectorAll('.section-title, .category-title, .menu-item, .fold-panel, .section, .category');
        
        allContentElements.forEach((element: Element) => {
          const el = element as HTMLElement;
          const rect = el.getBoundingClientRect();
          const pageRect = page.getBoundingClientRect();
          
          // Calculate position relative to page top (without scrollY, as we want relative to page)
          const relativeTop = rect.top - pageRect.top;
          const elementHeight = Math.max(
            el.scrollHeight,
            el.offsetHeight,
            rect.height
          );
          const elementBottom = relativeTop + elementHeight;
          maxBottom = Math.max(maxBottom, elementBottom);
        });
        
        // Also check container heights
        const containerHeight = foldableContainer ? Math.max(
          foldableContainer.scrollHeight,
          foldableContainer.offsetHeight,
          foldableContainer.getBoundingClientRect().height
        ) : 0;
        
        // Calculate from last element if available
        const lastElement = page.lastElementChild as HTMLElement;
        let lastElementBottom = 0;
        if (lastElement) {
          const lastRect = lastElement.getBoundingClientRect();
          const pageRect = page.getBoundingClientRect();
          const relativeTop = lastRect.top - pageRect.top;
          lastElementBottom = relativeTop + Math.max(
            lastElement.scrollHeight,
            lastElement.offsetHeight,
            lastRect.height
          );
        }
        
        // Use the maximum of all calculations, add generous padding to prevent cutting
        const baseHeight = Math.max(
          page.scrollHeight,
          page.offsetHeight,
          finalHeight,
          containerHeight,
          maxBottom,
          lastElementBottom
        );
        
        // Add minimal padding: only 10px top to prevent cutting, NO bottom padding
        const topPadding = 10;
        const bottomPadding = 0; // No bottom padding
        const fullContentHeight = baseHeight + topPadding;
        
        // Ensure page element has full height set so html2canvas captures everything
        page.style.height = `${fullContentHeight}px`;
        page.style.minHeight = `${fullContentHeight}px`;
        page.style.paddingTop = `${topPadding}px`; // Minimal top padding
        page.style.paddingBottom = '0'; // No bottom padding
        page.style.boxSizing = 'content-box'; // Padding adds to height
        
        // Also ensure container has full height
        if (foldableContainer) {
          foldableContainer.style.height = 'auto';
          foldableContainer.style.minHeight = `${containerHeight}px`;
          foldableContainer.style.paddingBottom = '0'; // No bottom padding
        }
        
        // Wait for height to be applied
        await new Promise(resolve => setTimeout(resolve, 300));
        void page.offsetHeight; // Force reflow
        void page.scrollHeight; // Force calculation
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Recalculate after padding
        const finalScrollHeight = Math.max(
          page.scrollHeight,
          page.offsetHeight,
          fullContentHeight
        );
        
        console.log(`Page ${i} capture dimensions: width=${pageWidth}, fullContentHeight=${fullContentHeight}, finalScrollHeight=${finalScrollHeight}, maxBottom=${maxBottom}, containerHeight=${containerHeight}`);
        
        // Capture with optimized settings for text rendering
        // Use the final scroll height to ensure full content capture
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: true, // Enable logging to debug
          backgroundColor: '#ffffff',
          width: pageWidth,
          height: finalScrollHeight, // Use calculated height with padding
          scrollX: 0,
          scrollY: 0,
          windowWidth: pageWidth,
          windowHeight: Math.max(window.innerHeight, finalScrollHeight + 300), // Extra large buffer
          removeContainer: false,
          imageTimeout: 30000,
          ignoreElements: (element) => {
            // Don't ignore any elements - capture everything
            return false;
          },
          onclone: (clonedDoc, element) => {
            try {
              // Ensure all text is visible in cloned document
              const clonedPage = element as HTMLElement;
              if (clonedPage) {
                // Set full height with minimal padding on cloned page
                clonedPage.style.height = `${finalScrollHeight}px`;
                clonedPage.style.minHeight = `${finalScrollHeight}px`;
                clonedPage.style.maxHeight = 'none';
                clonedPage.style.overflow = 'visible';
                clonedPage.style.overflowY = 'visible';
                clonedPage.style.paddingTop = '10px'; // Minimal padding at top
                clonedPage.style.paddingBottom = '0'; // No bottom padding
                clonedPage.style.boxSizing = 'content-box'; // Padding adds to height
                
                // Ensure foldable container expands naturally
                const clonedContainer = clonedPage.querySelector('.foldable-container') as HTMLElement;
                if (clonedContainer) {
                  clonedContainer.style.height = 'auto';
                  clonedContainer.style.minHeight = `${containerHeight}px`;
                  clonedContainer.style.maxHeight = 'none';
                  clonedContainer.style.overflow = 'visible';
                  clonedContainer.style.overflowY = 'visible';
                  clonedContainer.style.paddingBottom = '0'; // No bottom padding
                }
                
                // Ensure all panels expand naturally
                const clonedPanels = clonedPage.querySelectorAll('.fold-panel');
                clonedPanels.forEach((panel: Element) => {
                  const pan = panel as HTMLElement;
                  pan.style.height = 'auto';
                  pan.style.minHeight = 'auto';
                  pan.style.maxHeight = 'none';
                  pan.style.overflow = 'visible';
                  pan.style.overflowY = 'visible';
                });
                
                // Ensure all sections expand naturally
                const clonedSections = clonedPage.querySelectorAll('.section');
                clonedSections.forEach((section: Element) => {
                  const sec = section as HTMLElement;
                  sec.style.height = 'auto';
                  sec.style.minHeight = 'auto';
                  sec.style.maxHeight = 'none';
                  sec.style.overflow = 'visible';
                  sec.style.overflowY = 'visible';
                });
                
                // Get all text-containing elements
                const textSelectors = 'h1, h2, h3, h4, h5, h6, p, span, div, li, td, th, label, .item-name, .item-price, .item-description, .section-title, .category-title';
                const textElements = clonedPage.querySelectorAll(textSelectors);
                
                textElements.forEach((el: Element) => {
                  const elem = el as HTMLElement;
                  const style = window.getComputedStyle(elem);
                  
                  // Force visibility
                  elem.style.visibility = 'visible';
                  elem.style.opacity = '1';
                  
                  // Fix invisible text colors
                  const color = style.color;
                  if (!color || color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
                    // Check parent for color
                    let parent = elem.parentElement;
                    let foundColor = false;
                    while (parent && !foundColor) {
                      const parentColor = window.getComputedStyle(parent).color;
                      if (parentColor && parentColor !== 'rgba(0, 0, 0, 0)' && parentColor !== 'transparent') {
                        elem.style.color = parentColor;
                        foundColor = true;
                      }
                      parent = parent.parentElement;
                    }
                    if (!foundColor) {
                      elem.style.color = '#000000'; // Default to black
                    }
                  }
                  
                  // Ensure font is visible
                  if (style.fontSize === '0px' || parseFloat(style.fontSize) === 0) {
                    elem.style.fontSize = '14px';
                  }
                });
              }
            } catch (e) {
              console.warn('Error in onclone:', e);
            }
          }
        });
        
        // Check if canvas has content
        if (canvas.width === 0 || canvas.height === 0) {
          console.error(`Canvas for page ${i} is empty! Dimensions: ${canvas.width}x${canvas.height}`);
          Object.assign(page.style, originalStyles);
          // Restore other pages
          menuPages.forEach((otherPage: Element, idx: number) => {
            if (idx !== i) {
              const other = otherPage as HTMLElement;
              other.style.display = '';
              other.style.visibility = '';
            }
          });
          continue;
        }
        
        // Verify canvas captured content
        // Since we're not restricting height, html2canvas should capture full content
        const expectedCanvasHeight = actualRenderedHeight * 2; // scale is 2
        const heightDifference = Math.abs(canvas.height - expectedCanvasHeight);
        
        console.log(`Canvas captured: ${canvas.width}x${canvas.height} (page scrollHeight: ${page.scrollHeight}, actualRenderedHeight: ${actualRenderedHeight}px, expected: ~${expectedCanvasHeight}px)`);
        
        if (heightDifference > 200) {
          console.warn(`Canvas height differs significantly: Expected ~${expectedCanvasHeight}px, got ${canvas.height}px. This might indicate content was cut.`);
        }
        
        // Verify canvas has actual content (not just white)
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Check multiple sample areas for content - especially bottom to detect cuts
          const sampleSize = Math.min(200, Math.floor(canvas.width / 4), Math.floor(canvas.height / 4));
          const samples = [
            { x: 0, y: 0 }, // Top-left
            { x: canvas.width - sampleSize, y: 0 }, // Top-right
            { x: 0, y: Math.max(0, canvas.height - sampleSize - 50) }, // Bottom-left (with margin)
            { x: canvas.width - sampleSize, y: Math.max(0, canvas.height - sampleSize - 50) }, // Bottom-right (with margin)
            { x: Math.floor(canvas.width / 2) - sampleSize / 2, y: Math.floor(canvas.height / 2) - sampleSize / 2 }, // Center
            { x: Math.floor(canvas.width / 4), y: Math.max(0, canvas.height - 100) }, // Bottom center-left
            { x: Math.floor(canvas.width * 3 / 4), y: Math.max(0, canvas.height - 100) } // Bottom center-right
          ];
          
          let hasContent = false;
          for (const sample of samples) {
            try {
              const imageData = ctx.getImageData(
                Math.max(0, sample.x),
                Math.max(0, sample.y),
                sampleSize,
                sampleSize
              );
              const hasNonWhite = Array.from(imageData.data).some((val, idx) => {
                if (idx % 4 === 3) return false; // Skip alpha channel
                return val < 240; // Not pure white (more lenient threshold)
              });
              if (hasNonWhite) {
                hasContent = true;
                break;
              }
            } catch (e) {
              // Sample area might be out of bounds, skip
            }
          }
          
          if (!hasContent) {
            console.error(`Canvas for page ${i} appears to be blank/white! Canvas size: ${canvas.width}x${canvas.height}`);
            // Don't skip - try to capture anyway, might be a white background page
          }
        }
        
        console.log(`Successfully captured page ${i}: ${canvas.width}x${canvas.height}`);
        
        // Restore original styles for current page
        Object.assign(page.style, originalStyles);
        
        // Restore other pages visibility
        menuPages.forEach((otherPage: Element, idx: number) => {
          if (idx !== i) {
            const other = otherPage as HTMLElement;
            other.style.display = '';
            other.style.visibility = '';
          }
        });

        // Convert canvas to image data
        const imgData = canvas.toDataURL('image/png', 1.0);
        
        // Calculate dimensions - ALWAYS use exactly 70% of PDF width for ALL pages
        const aspectRatio = canvas.width / canvas.height;
        const targetWidth = pdfWidth * 0.6; // 70% of PDF width = 297mm * 0.7 = 207.9mm
        const calculatedImgHeight = targetWidth / aspectRatio;
        
        // Add new page if not the first
        if (i > 0) {
          pdf.addPage();
        }
        
        // IMPORTANT: One section per page - scale down if needed to fit on one page
        // CRITICAL: Keep width ALWAYS at 70% (targetWidth) for ALL pages
        let finalImgHeight = calculatedImgHeight;
        
        if (calculatedImgHeight > pdfHeight) {
          // Scale down proportionally to fit height, but keep width at 70%
          const scaleFactor = pdfHeight / calculatedImgHeight;
          finalImgHeight = pdfHeight;
          
          // Calculate what the scaled width would be
          const scaledWidth = targetWidth * scaleFactor;
          
          // Scale width back to targetWidth (70%) to ensure consistency
          const widthScaleBack = targetWidth / scaledWidth;
          finalImgHeight = finalImgHeight * widthScaleBack;
          
          // Clamp height if it still exceeds
          if (finalImgHeight > pdfHeight) {
            finalImgHeight = pdfHeight;
          }
          
          console.log(`Page ${i}: width=${targetWidth.toFixed(1)}mm (70% FIXED), height=${finalImgHeight.toFixed(1)}mm, scaleFactor=${scaleFactor.toFixed(2)}`);
        } else {
          console.log(`Page ${i}: width=${targetWidth.toFixed(1)}mm (70% FIXED), height=${finalImgHeight.toFixed(1)}mm`);
        }
        
        // ALWAYS use targetWidth (70%) for width - NEVER change it
        const xOffset = (pdfWidth - targetWidth) / 2; // Center horizontally
        const yOffset = Math.max(0, (pdfHeight - finalImgHeight) / 2); // Center vertically
        
        // Add image to PDF - ALWAYS 70% width (targetWidth), center on page
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, targetWidth, finalImgHeight);
      }

      // Cleanup - remove temporary stylesheet if still exists
      const tempStyle = document.getElementById('temp-capture-styles');
      if (tempStyle) {
        tempStyle.remove();
      }

      // Save the PDF
      pdf.save(`${projectName}-Menu-${new Date().toISOString().split('T')[0]}.pdf`);
      
      setIsGeneratingPDF(false);
    } catch (error) {
      console.error('PDF generation error:', error);
      
      // Cleanup - remove temporary stylesheet
      const tempStyle = document.getElementById('temp-capture-styles');
      if (tempStyle) {
        tempStyle.remove();
      }
      
      setIsGeneratingPDF(false);
      alert('Error generating PDF. Please try again.');
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
                  Select Template Style ({selectedTemplate}/14):
                </label>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
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
                  disabled={isGeneratingPDF}
                  className={`bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl font-bold text-base hover:from-green-600 hover:to-emerald-700 transition-all shadow-xl transform hover:scale-105 cursor-pointer w-full ${
                    isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isGeneratingPDF ? '⏳ Generating PDF...' : '📄 Download PDF'}
                </button>
              </div>
              
              <div className="text-xs text-gray-300 space-y-1">
                <p className="font-semibold">📋 Instructions:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2 text-xs">
                  <li>Select a template</li>
                  <li>Click "Download PDF" button</li>
                  <li>PDF will download automatically</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Right Side - Preview/Page */}
          <div className="lg:col-span-2">
            {/* Menu Content - Same for preview and print */}
            <div 
              ref={menuContainerRef}
              className={`print-container template-${selectedTemplate} border-4 border-[#9CAF88] rounded-xl shadow-2xl bg-white`} 
              style={{ width: '100%', maxWidth: '100%', color: '#000' }}
            >
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

      {/* PDF Generation Loader Overlay */}
      {isGeneratingPDF && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center">
            <div className="mb-6">
              {/* Animated Spinner */}
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Generating PDF...</h3>
            <p className="text-gray-600 mb-4">Please wait</p>
            
            <div className="mt-4 text-sm text-gray-400">
              This may take a few seconds
            </div>
          </div>
        </div>
      )}

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
        
        /* Dark templates - ensure dark background and white text with good contrast */
        .template-9 .menu-page,
        .template-9 .cover-page {
          background: #1a1a1a !important;
          background-color: #1a1a1a !important;
        }
        
        .template-11 .menu-page,
        .template-11 .cover-page {
          background: #8B1A1A !important;
          background-color: #8B1A1A !important;
        }
        
        .template-12 .menu-page,
        .template-12 .cover-page {
          background: linear-gradient(135deg, #722F37 0%, #8B1A1A 100%) !important;
          background-color: #722F37 !important;
        }
        
        @media print {
          .template-9 .menu-page,
          .template-9 .cover-page,
          .template-11 .menu-page,
          .template-11 .cover-page,
          .template-12 .menu-page,
          .template-12 .cover-page {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
        
        .template-9 .fold-panel,
        .template-11 .fold-panel,
        .template-12 .fold-panel {
          background: transparent !important;
        }
        
        .template-9 .menu-item,
        .template-11 .menu-item,
        .template-12 .menu-item {
          background: rgba(255, 255, 255, 0.05) !important;
        }
        
        .template-9 .item-name,
        .template-11 .item-name,
        .template-12 .item-name {
          color: #FFFFFF !important;
          font-weight: 600 !important;
        }
        
        .template-9 .item-description,
        .template-11 .item-description,
        .template-12 .item-description {
          color: #E8E8E8 !important;
          font-weight: normal !important;
        }
        
        .template-9 .item-price,
        .template-11 .item-price,
        .template-12 .item-price {
          color: #FFD700 !important;
          font-weight: 700 !important;
        }
        
        .template-9 .section-title,
        .template-11 .section-title,
        .template-12 .section-title {
          color: #D4AF37 !important;
          font-weight: bold !important;
        }
        
        .template-9 .category-title,
        .template-11 .category-title,
        .template-12 .category-title {
          color: #F4D03F !important;
          font-weight: 600 !important;
        }
        
        /* Template 13 - Light background, dark text */
        .template-13 .item-name {
          color: #2C2C2C !important;
          font-weight: 600 !important;
        }
        
        .template-13 .item-price {
          color: #8B1A1A !important;
          font-weight: 700 !important;
        }
        
        .template-13 .item-description {
          color: #666666 !important;
        }
        
        .template-13 .section-title {
          color: #D4AF37 !important;
          font-weight: bold !important;
        }
        
        .template-13 .category-title {
          color: #8B1A1A !important;
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
          margin-bottom: 4px;
          padding: 3px 4px;
        }
        
        .menu-item:last-child {
          margin-bottom: 0;
        }
        
        /* Dynamic spacing based on item count - Professional menu card */
        
        /* Spacious - Few items (0-10 items) - Start from top with large spacing */
        .spacing-spacious.menu-page {
          padding: 15px !important;
        }
        .spacing-spacious .fold-panel {
          padding: 12px 10px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
        }
        .spacing-spacious .section {
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
        }
        .spacing-spacious .category {
          margin-bottom: 15px !important;
        }
        .spacing-spacious .category-title {
          font-size: 15px !important;
          margin-bottom: 10px !important;
          margin-top: 15px !important;
          font-weight: 700 !important;
        }
        .spacing-spacious .menu-item {
          margin-bottom: 15px !important;
          padding: 8px 10px !important;
        }
        .spacing-spacious .item-name {
          font-size: 14px !important;
          line-height: 1.4 !important;
          font-weight: 600 !important;
        }
        .spacing-spacious .item-description {
          font-size: 11px !important;
          line-height: 1.35 !important;
          margin-top: 4px !important;
        }
        .spacing-spacious .item-price {
          font-size: 13px !important;
          font-weight: 700 !important;
        }
        .spacing-spacious .section-title {
          font-size: 22px !important;
          margin-bottom: 20px !important;
          padding: 12px 0 !important;
        }
        
        /* Normal - Medium items (11-15 items) - Start from top with good spacing */
        .spacing-normal.menu-page {
          padding: 12px !important;
        }
        .spacing-normal .fold-panel {
          padding: 8px 8px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
        }
        .spacing-normal .section {
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
        }
        .spacing-normal .category {
          margin-bottom: 12px !important;
        }
        .spacing-normal .category-title {
          font-size: 14px !important;
          margin-bottom: 8px !important;
          margin-top: 10px !important;
          font-weight: 700 !important;
        }
        .spacing-normal .menu-item {
          margin-bottom: 10px !important;
          padding: 5px 7px !important;
        }
        .spacing-normal .item-name {
          font-size: 13px !important;
          line-height: 1.35 !important;
          font-weight: 600 !important;
        }
        .spacing-normal .item-description {
          font-size: 10px !important;
          line-height: 1.3 !important;
          margin-top: 3px !important;
        }
        .spacing-normal .item-price {
          font-size: 12px !important;
          font-weight: 700 !important;
        }
        .spacing-normal .section-title {
          font-size: 20px !important;
          margin-bottom: 15px !important;
          padding: 10px 0 !important;
        }
        
        /* Medium - More items (16-22 items) - Start from top with moderate spacing */
        .spacing-medium.menu-page {
          padding: 10px !important;
        }
        .spacing-medium .fold-panel {
          padding: 6px 6px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
        }
        .spacing-medium .section {
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
        }
        .spacing-medium .category {
          margin-bottom: 10px !important;
        }
        .spacing-medium .category-title {
          font-size: 13px !important;
          margin-bottom: 6px !important;
          margin-top: 8px !important;
          font-weight: 700 !important;
        }
        .spacing-medium .menu-item {
          margin-bottom: 8px !important;
          padding: 4px 6px !important;
        }
        .spacing-medium .item-name {
          font-size: 12px !important;
          line-height: 1.3 !important;
          font-weight: 600 !important;
        }
        .spacing-medium .item-description {
          font-size: 9px !important;
          line-height: 1.25 !important;
          margin-top: 2px !important;
        }
        .spacing-medium .item-price {
          font-size: 11px !important;
          font-weight: 700 !important;
        }
        .spacing-medium .section-title {
          font-size: 18px !important;
          margin-bottom: 12px !important;
          padding: 8px 0 !important;
        }
        
        /* Compact - Many items (23-30 items) - Tight spacing, minimal category gaps */
        .spacing-compact.menu-page {
          padding: 8px !important;
        }
        .spacing-compact .fold-panel {
          padding: 5px 5px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
        }
        .spacing-compact .section {
          display: flex !important;
          flex-direction: column !important;
        }
        .spacing-compact .category {
          margin-bottom: 2px !important;
        }
        .spacing-compact .category-title {
          font-size: 12px !important;
          margin-bottom: 3px !important;
          margin-top: 3px !important;
          font-weight: 700 !important;
        }
        .spacing-compact .menu-item {
          margin-bottom: 4px !important;
          padding: 3px 4px !important;
        }
        .spacing-compact .item-name {
          font-size: 11px !important;
          line-height: 1.25 !important;
          font-weight: 600 !important;
        }
        .spacing-compact .item-description {
          font-size: 8px !important;
          line-height: 1.2 !important;
          margin-top: 1px !important;
        }
        .spacing-compact .item-price {
          font-size: 10px !important;
          font-weight: 700 !important;
        }
        .spacing-compact .section-title {
          font-size: 16px !important;
          margin-bottom: 8px !important;
          padding: 6px 0 !important;
        }
        
        /* Very Compact - Too many items (31+ items) - Minimal category spacing */
        .spacing-very-compact.menu-page {
          padding: 6px !important;
        }
        .spacing-very-compact .fold-panel {
          padding: 4px 4px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
        }
        .spacing-very-compact .section {
          display: flex !important;
          flex-direction: column !important;
        }
        .spacing-very-compact .category {
          margin-bottom: 1px !important;
        }
        .spacing-very-compact .category-title {
          font-size: 11px !important;
          margin-bottom: 2px !important;
          margin-top: 2px !important;
          font-weight: 700 !important;
        }
        .spacing-very-compact .menu-item {
          margin-bottom: 3px !important;
          padding: 2px 3px !important;
        }
        .spacing-very-compact .item-name {
          font-size: 10px !important;
          line-height: 1.2 !important;
          font-weight: 600 !important;
        }
        .spacing-very-compact .item-description {
          font-size: 8px !important;
          line-height: 1.15 !important;
          margin-top: 1px !important;
        }
        .spacing-very-compact .item-price {
          font-size: 9px !important;
          font-weight: 700 !important;
        }
        .spacing-very-compact .section-title {
          font-size: 15px !important;
          margin-bottom: 6px !important;
          padding: 5px 0 !important;
        }
        
        /* Stylish Watermark for all menu pages */
        .menu-page {
          position: relative !important;
          overflow: hidden !important;
        }
        
        /* Main watermark - Restaurant name */
        .menu-page::before {
          content: 'SAGAR CAFE' !important;
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) rotate(-45deg) !important;
          font-size: 100px !important;
          font-weight: 900 !important;
          color: rgba(212, 175, 55, 0.04) !important;
          z-index: 0 !important;
          pointer-events: none !important;
          white-space: nowrap !important;
          letter-spacing: 15px !important;
          font-family: 'Georgia', 'Times New Roman', serif !important;
          text-transform: uppercase !important;
        }
        
        /* Decorative corner ornaments */
        .menu-page::after {
          content: '' !important;
          position: absolute !important;
          top: 15px !important;
          right: 15px !important;
          width: 80px !important;
          height: 80px !important;
          border-top: 3px solid rgba(212, 175, 55, 0.15) !important;
          border-right: 3px solid rgba(212, 175, 55, 0.15) !important;
          border-top-right-radius: 8px !important;
          z-index: 0 !important;
          pointer-events: none !important;
        }
        
        /* Bottom left corner decoration */
        .foldable-container::before {
          content: '' !important;
          position: absolute !important;
          bottom: 15px !important;
          left: 15px !important;
          width: 80px !important;
          height: 80px !important;
          border-bottom: 3px solid rgba(212, 175, 55, 0.15) !important;
          border-left: 3px solid rgba(212, 175, 55, 0.15) !important;
          border-bottom-left-radius: 8px !important;
          z-index: 0 !important;
          pointer-events: none !important;
        }
        
        /* Ensure content is above watermark */
        .menu-page > * {
          position: relative !important;
          z-index: 1 !important;
        }
        
        .section-title,
        .foldable-container {
          position: relative !important;
          z-index: 2 !important;
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
          box-sizing: border-box;
        }
        
        /* Ensure cover page has same width */
        .cover-page {
          width: 100% !important;
          box-sizing: border-box !important;
        }
        .menu-page:last-child {
          page-break-after: auto;
        }
        
        @media print {
          @page {
            size: A4 landscape;
            margin: 0.5cm;
          }
            
            /* Prevent blank pages */
            @page :blank {
              @top-center { content: none; }
              @bottom-center { content: none; }
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
          
          /* Menu pages settings - Card Style - Match screen exactly */
          .menu-page {
            page-break-before: auto !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            width: 100% !important;
            padding: 20px !important;
            margin: 0 !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            background: #FFFFFF !important;
            background-color: #FFFFFF !important;
            border: 2px solid #E0E0E0 !important;
            border-radius: 8px !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Only add page break if not last page and has content */
          .menu-page:not(:last-child) {
            page-break-after: always !important;
          }
          
          .menu-page:first-of-type {
            page-break-before: auto !important;
          }
          
          .menu-page:last-child {
            page-break-after: auto !important;
          }
          
          /* Hide completely empty menu pages */
          .menu-page:empty {
            display: none !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
          }
          
          /* Hide pages with empty containers */
          .menu-page:has(.foldable-container:empty) {
            display: none !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
          }
          
          /* Prevent blank pages from orphaned breaks */
          .menu-page + .menu-page:empty {
            display: none !important;
          }
          
          /* Ensure content exists before breaking */
          .menu-page:not(:has(.foldable-container .section *)) {
            display: none !important;
          }
          
          /* Section title styling in print - Match screen */
          .menu-page > .section-title {
            margin-top: 0 !important;
            margin-bottom: 15px !important;
            padding-bottom: 8px !important;
            font-size: 18px !important;
            line-height: 1.3 !important;
            font-weight: bold !important;
            text-align: center !important;
            width: 100% !important;
            display: block !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Foldable container - 2 columns - Match screen */
          .foldable-container {
            grid-template-columns: 1fr 1px 1fr !important;
            width: 100% !important;
            max-width: 100% !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            display: grid !important;
            gap: 0 !important;
            row-gap: 0 !important;
            align-items: start !important;
          }
          
          .fold-panel {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            width: 100% !important;
            padding: 12px 10px !important;
            background: #FAFAFA !important;
            background-color: #FAFAFA !important;
            border: 1px solid #E8E8E8 !important;
            border-radius: 4px !important;
            display: flex !important;
            flex-direction: column !important;
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Equal spacing for all elements - Match screen */
          .menu-page > .section-title {
            margin-top: 0 !important;
            margin-bottom: 15px !important;
            padding-bottom: 8px !important;
            font-size: 18px !important;
            line-height: 1.3 !important;
            font-weight: bold !important;
            text-align: center !important;
            width: 100% !important;
            display: block !important;
            color: inherit !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .section-title:first-child {
            margin-top: 0 !important;
          }
          
          /* Section title inside fold-panel (legacy support) */
          .fold-panel .section-title {
            margin-top: 0 !important;
            margin-bottom: 6px !important;
            padding-bottom: 4px !important;
            font-size: 16px !important;
            line-height: 1.2 !important;
            font-weight: bold !important;
            border-bottom: 2px solid #D4AF37 !important;
            color: inherit !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
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
            line-height: 1.2 !important;
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
            flex: 1 1 auto !important;
            min-height: 0 !important;
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
          
          /* Equal spacing - all items same margin - Match screen */
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
          
          /* Section and category breaks - prevent breaking to fit on one page */
          .section {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            orphans: 3 !important;
            widows: 3 !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          .category {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            orphans: 2 !important;
            widows: 2 !important;
          }
          
          .menu-item {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          /* Ensure foldable container fits on one page */
          .foldable-container {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            orphans: 3 !important;
            widows: 3 !important;
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
          /* Color set by global rule - #FFD700 */
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
        }
        @media print {
          .template-11 {
            background: #8B1A1A !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
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
          font-size: 18px;
          /* Color set by global rule - #FFD700 */
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
        }
        @media print {
          .template-12 {
            background: #722F37 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
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
          font-size: 19px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          /* Color set by global rule - #FFD700 */
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
          font-size: 15px;
          /* Color set by global rule - #8B1A1A */
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

        /* Template 14: Modern Sagar Cafe Theme - Main Page Inspired */
        .template-14 {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background: linear-gradient(to bottom, #F5F5DC 0%, #FAFAF0 100%);
        }
        .template-14 .menu-header {
          text-align: center;
          padding: 40px 30px;
          margin-bottom: 30px;
          background: linear-gradient(135deg, #9CAF88 0%, #6B7C65 100%);
          color: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          position: relative;
          overflow: hidden;
        }
        .template-14 .menu-header::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
        }
        .template-14 .section-title {
          font-size: 26px;
          color: #6B7C65;
          margin-top: 30px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          position: relative;
          padding-bottom: 10px;
        }
        .template-14 .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: linear-gradient(to right, transparent, #9CAF88, transparent);
        }
        .template-14 .category-title {
          font-size: 18px;
          color: #6B8E23;
          margin-top: 20px;
          margin-bottom: 12px;
          font-weight: 600;
          text-align: center;
          font-style: italic;
        }
        .template-14 .menu-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding: 10px 15px;
          background: white;
          border-left: 4px solid #9CAF88;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.08);
          transition: all 0.2s ease;
        }
        .template-14 .menu-item:hover {
          box-shadow: 0 4px 10px rgba(156, 175, 136, 0.2);
          transform: translateX(2px);
        }
        .template-14 .item-name {
          font-weight: 600;
          font-size: 15px;
          color: #2C3E50;
        }
        .template-14 .item-price {
          font-weight: bold;
          color: #6B8E23;
          font-size: 16px;
          background: linear-gradient(135deg, #9CAF88 0%, #6B8E23 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .template-14 .item-description {
          font-size: 12px;
          color: #5A6C7D;
          margin-top: 4px;
          line-height: 1.4;
        }
        .template-14 .cover-panel {
          background: linear-gradient(135deg, #9CAF88 0%, #6B7C65 100%);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 50px 30px;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }
        .template-14 .cover-panel::before {
          content: '';
          position: absolute;
          top: -100px;
          left: -100px;
          width: 300px;
          height: 300px;
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
        }
        .template-14 .cover-panel::after {
          content: '';
          position: absolute;
          bottom: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
        }
        .template-14 .cover-title {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
          z-index: 1;
        }
        .template-14 .cover-subtitle {
          font-size: 20px;
          font-style: italic;
          color: #F5F5DC;
          margin-bottom: 30px;
          z-index: 1;
        }
        .template-14 .contact-info {
          margin-top: 30px;
          font-size: 14px;
          opacity: 0.95;
          z-index: 1;
        }
        @media print {
          .template-14 .fold-line {
            background: repeating-linear-gradient(
              to bottom,
              #9CAF88 0px,
              #9CAF88 1px,
              transparent 1px,
              transparent 8px
            );
          }
          .template-14 .foldable-container {
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
    
    // Filter out empty sections first
    const validSections = sections.filter(sectionName => {
      const sectionData = menuData[sectionName];
      const categories = Object.keys(sectionData).filter(cat => 
        sectionData[cat] && Array.isArray(sectionData[cat]) && sectionData[cat].length > 0
      );
      return categories.length > 0;
    });
    
    const totalPages = validSections.length + 1; // +1 for cover page
    
    return (
      <>
        {/* Cover Page */}
        <CoverPage />
        
        {/* Menu Pages - One page per section */}
        {validSections.map((sectionName, pageIndex) => {
          // Get all categories for this section
          const sectionData = menuData[sectionName];
          const categories = Object.keys(sectionData).filter(cat => 
            sectionData[cat] && Array.isArray(sectionData[cat]) && sectionData[cat].length > 0
          );
          
          // Distribute categories across 2 panels based on content balance
          // Calculate items count for each category to balance content
          const categoryWeights = categories.map(cat => {
            const items = sectionData[cat];
            const itemCount = Array.isArray(items) ? items.length : 0;
            return { category: cat, weight: itemCount + 1 }; // +1 for category title
          });
          
          // Sort by weight (descending) to distribute larger categories first
          categoryWeights.sort((a, b) => b.weight - a.weight);
          
          // Distribute categories to balance content between panels
          let panel1Weight = 0;
          let panel2Weight = 0;
          const panel1Categories: string[] = [];
          const panel2Categories: string[] = [];
          
          for (const { category, weight } of categoryWeights) {
            // Add to the panel with less weight
            if (panel1Weight <= panel2Weight) {
              panel1Categories.push(category);
              panel1Weight += weight;
            } else {
              panel2Categories.push(category);
              panel2Weight += weight;
            }
          }
          
          // Filter to ensure only categories with items are included
          const panel1ValidCategories = panel1Categories.filter(cat => 
            sectionData[cat] && Array.isArray(sectionData[cat]) && sectionData[cat].length > 0
          );
          const panel2ValidCategories = panel2Categories.filter(cat => 
            sectionData[cat] && Array.isArray(sectionData[cat]) && sectionData[cat].length > 0
          );
          
          // Check if this section has any items - count total items
          const totalItems = categories.reduce((count, cat) => {
            return count + (sectionData[cat] && Array.isArray(sectionData[cat]) ? sectionData[cat].length : 0);
          }, 0);
          
          // Only render if there are actual menu items
          if (totalItems === 0) {
            return null;
          }
          
          // Calculate dynamic spacing based on item count
          // More items = less spacing, fewer items = more spacing
          let spacingLevel = 'normal';
          
          if (totalItems > 30) {
            spacingLevel = 'very-compact'; // Very tight for 30+ items
          } else if (totalItems > 22) {
            spacingLevel = 'compact'; // Tight for 23-30 items
          } else if (totalItems > 15) {
            spacingLevel = 'medium'; // Medium for 16-22 items
          } else if (totalItems > 10) {
            spacingLevel = 'normal'; // Normal for 11-15 items
          } else {
            spacingLevel = 'spacious'; // Spacious for 0-10 items
          }
          
          console.log(`Section "${sectionName}": ${totalItems} items, spacing level: ${spacingLevel}`);
          
          return (
            <div 
              key={pageIndex} 
              className={`menu-page template-${template} spacing-${spacingLevel}`} 
              style={{ 
                pageBreakBefore: pageIndex === 0 ? 'auto' : 'always'
              }}
            >
              {/* Section Title - Full Width */}
              <h2 className="section-title" style={{ color: colors.sectionTitle, borderBottomColor: colors.sectionBorder, borderBottom: `3px solid ${colors.sectionBorder}` }}>{sectionName}</h2>
              
              <div className="foldable-container">
                {/* Left Panel */}
                <div className="fold-panel">
                  <div className="section">
                    {panel1ValidCategories.length > 0 && panel1ValidCategories.map((category) => (
                      <div key={category} className="category">
                        <h3 className="category-title" style={{ color: colors.categoryTitle }}>{category}</h3>
                        {sectionData[category] && sectionData[category].map((item, index) => (
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
                    {panel2ValidCategories.length > 0 ? (
                      <>
                        {panel2ValidCategories.map((category) => (
                      <div key={category} className="category">
                        <h3 className="category-title" style={{ color: colors.categoryTitle }}>{category}</h3>
                            {sectionData[category] && sectionData[category].map((item, index) => (
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
                      </>
                    ) : null}
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
