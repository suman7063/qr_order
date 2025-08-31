import { MenuData, MenuItem } from '@/types/menu';

export const parseCSV = (csvText: string): MenuItem[] => {
  const lines = csvText.split('\n');
  if (lines.length < 2) return [];

  const [headerLine, ...dataLines] = lines;
  
  return dataLines
    .filter(line => line.trim())
    .map(line => {
      // Handle CSV with quotes and commas
      const values = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      return {
        section: values[0] || '',
        category: values[1] || '',
        itemName: values[2] || '',
        description: values[3] || '',
        priceRegular: values[4] && !isNaN(Number(values[4])) ? Number(values[4]) : undefined,
        priceSmall: values[5] && !isNaN(Number(values[5])) ? Number(values[5]) : undefined,
        priceMedium: values[6] && !isNaN(Number(values[6])) ? Number(values[6]) : undefined,
        priceLarge: values[7] && !isNaN(Number(values[7])) ? Number(values[7]) : undefined,
        status: values[8] || 'Active',
        isActive: values[9] === 'TRUE',
        bestSeller: values[10] === 'TRUE',
        chefSpecial: values[11] === 'TRUE',
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
    cache: 'no-store' // Always fetch fresh data
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
