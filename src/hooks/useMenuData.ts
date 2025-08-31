'use client';

import { useState, useEffect } from 'react';
import { MenuData } from '@/types/menu';

export const useMenuData = () => {
  const [menuData, setMenuData] = useState<MenuData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/menu');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setMenuData(data);
      } catch (err) {
        setError('Failed to load menu. Please check if the Google Sheet is public and accessible.');
        console.error('Menu fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return { menuData, loading, error };
};
