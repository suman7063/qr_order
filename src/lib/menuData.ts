import { MenuData, MenuItem } from '@/types/menu';

// Proper CSV parser that handles quoted fields with commas
const parseCSVLine = (line: string): string[] => {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  values.push(current.trim());
  
  return values;
};

export const parseCSV = (csvText: string): MenuItem[] => {
  const lines = csvText.split('\n');
  if (lines.length < 2) return [];

  const [headerLine, ...dataLines] = lines;
  
  return dataLines
    .filter(line => line.trim())
    .map(line => {
      const values = parseCSVLine(line);

      return {
        section: values[0] || '',
        category: values[1] || '',
        itemName: values[2] || '',
        description: values[3] || '',
        priceRegular: values[4] && values[4].trim() && !isNaN(Number(values[4])) ? Number(values[4]) : undefined,
        priceSmall: values[5] && values[5].trim() && !isNaN(Number(values[5])) ? Number(values[5]) : undefined,
        priceMedium: values[6] && values[6].trim() && !isNaN(Number(values[6])) ? Number(values[6]) : undefined,
        priceLarge: values[7] && values[7].trim() && !isNaN(Number(values[7])) ? Number(values[7]) : undefined,
        status: values[8]?.trim() || 'Active',
        isActive: values[9]?.trim().toUpperCase() === 'TRUE',
        bestSeller: values[10]?.trim().toUpperCase() === 'TRUE',
        chefSpecial: values[11]?.trim().toUpperCase() === 'TRUE',
        todaysSpecial: values[12]?.trim().toUpperCase() === 'TRUE',
      };
    })
    .filter(item => item.status === 'Active' && item.isActive);
};

export const fetchMenuData = async (): Promise<MenuData> => {
  const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  if (!SHEET_ID) {
    throw new Error('Google Sheet ID not found');
  }

  const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
  
  const response = await fetch(csvUrl, { 
    next: { revalidate: 300 }, // Cache for 5 minutes
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Restaurant-Menu-App/1.0)',
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const csvText = await response.text();
  const menuItems = parseCSV(csvText);

  // Group data by section and category
  const grouped = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = {};
    if (!acc[item.section][item.category]) acc[item.section][item.category] = [];
    acc[item.section][item.category].push(item);
    return acc;
  }, {} as MenuData);

  return grouped;
};
