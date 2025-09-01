import { useCallback } from 'react';
import { trackClick } from '@/lib/amplitude';

export const useClickTracking = () => {
  const handleClick = useCallback((elementName: string, properties?: Record<string, any>) => {
    trackClick(elementName, properties);
  }, []);

  return { handleClick };
};
