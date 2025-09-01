'use client';

import { useEffect } from 'react';
import { initAmplitude, trackSessionStart, trackPageView, trackEngagement } from '@/lib/amplitude';

interface AmplitudeProviderProps {
  children: React.ReactNode;
}

export const AmplitudeProvider: React.FC<AmplitudeProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize Amplitude on the client side
    initAmplitude();
    
    // Track session start
    trackSessionStart();
    
    // Track initial page view
    trackPageView('home');
    
    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        trackEngagement('page_visible');
      } else {
        trackEngagement('page_hidden');
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <>{children}</>;
};
